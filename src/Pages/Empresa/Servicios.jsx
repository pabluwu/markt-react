import { useEffect, useState, useMemo } from "react";
import { updateEmpresa } from "../../services/useEmpresas";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Input from "../../Components/Input/Input";
import InputArray from "../../Components/Input/InputArray";
import Textarea from "../../Components/Textarea/Textarea";
import TextareaArray from "../../Components/Textarea/TextareaArray";
import Tab from "../../Components/Tab/Tab";
import Select from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";

import { api } from "../../assets/variables";
import CopiarIcon from "../../assets/copiar-alt.svg";
import DetalleIcon from "../../assets/detalle-de-atencion.svg";
import EditIcon from "../../assets/editar.svg";

const Servicios = ({ empresa }) => {
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, reset } = useForm({
        defaultValues: {
            productos: [{
                nombre: "",
                descripcion_breve: "",
                unidad_venta: "",
                precio_estimado: "",
                disponibilidad_geografica: ""
            }]
        }
    });

    useEffect(() => {
        setValue('empresa', empresa.id);
    }, [empresa])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productos"
    });

    const opciones = [
        { key: 'crear-servicio', nombre: 'Crear' },
        { key: 'mis-servicios', nombre: 'Mis Servicios' }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);

    console.log(selectedOption);

    const formas_pago_choices = [
        { value: 'TRANSFERENCIA', label: "Transferencia" },
        { value: 'CREDITO', label: "Crédito 30-60-90 días" },
        { value: 'WEBPAY', label: "Webpay" },
        { value: 'CRIPTO', label: "Criptomonedas u otras" },
    ];

    const modalidades_choices = [
        { value: 'PRESENCIAL', label: "Presencial" },
        { value: 'REMOTO', label: "Remoto / Online" },
        { value: 'TERRENO', label: "En terreno / Despacho incluido" },
    ];

    const obtenerServicios = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/servicios/?empresa_id=${empresa.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener información del like');
        }
        return response.json();
    };

    const { data: servicios, refetch: refetchServicios } = useQuery(
        {
            queryKey: ['comentarios', empresa.id], // La clave ahora es un objeto
            queryFn: obtenerServicios,
            enabled: !!empresa.id,  // Solo se ejecuta si selected tiene un id
        }
    );

    // console.log(servicios);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/servicios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }
            return response.json();
        },
        onSuccess: (data) => {
            // console.log('servicio creado:', data);
            alert('Creado con éxito');
            reset();
            refetchServicios();
        },
        onError: (error) => {
            console.error('Error:', error);
            alert('Hubo un error al crear el servicio');
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    };

    // Verifica si todos los campos de un producto están completos
    const isProductValid = (index) => {
        const product = watch(`productos.${index}`);
        return product?.nombre && product?.descripcion_breve && product?.unidad_venta && product?.precio_estimado && product?.disponibilidad_geografica;
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'descripcion',
                header: 'Descripción',
            },
            {
                accessorKey: 'tiempo_entrega',
                header: 'Tiempo de entrega',
            },
            {
                id: 'action',
                header: 'Acciones',
                cell: ({ row }) => {
                    // console.log(row); 
                    return (
                        <div className="d-flex gap-4">
                            <span data-tooltip="Copiar servicio">
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={CopiarIcon} alt="" />
                            </span>
                            <span data-tooltip="Ver detalle">
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={DetalleIcon} alt="" />
                            </span>
                            <span data-tooltip="Editar servicio">
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={EditIcon} alt="" />
                            </span>
                        </div>
                    )// This will help confirm the structure of each row's data
                },
            }

        ],
        []
    );

    return (
        <>
            <Tab
                opciones={opciones}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />
            <div className="rounded mis-empresas-card p-3">
                {
                    selectedOption.key == 'crear-servicio' &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <h5>
                                    Crea un servicio
                                </h5>
                            </div>
                            <div className="col-m-12">
                                <Textarea
                                    label={'Descripción del servicio'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'descripcion'}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    label={'Tiempo promedio de entrega'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'tiempo_entrega'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-6">
                                <MultiSelect
                                    control={control}
                                    name={'modalidades_atencion'}
                                    options={modalidades_choices}
                                    label={'Modalidad de atención'}
                                    errors={errors}
                                    rules={{ required: 'Este campo es requerido' }} />
                            </div>
                            <div className="col-md-6">
                                <MultiSelect
                                    control={control}
                                    name={'formas_pago'}
                                    options={formas_pago_choices}
                                    label={'Formas de pago'}
                                    errors={errors}
                                    rules={{ required: 'Este campo es requerido' }} />
                            </div>
                            <div className="col-md-12">
                                <Textarea
                                    label={'Certificaciones y garantías (Opcional)'}
                                    register={register}
                                    name={'certificaciones'}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-12 mt-4">
                                <h5>
                                    Contacto
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Nombre'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_nombre'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Cargo'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_cargo'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Email'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_email'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Telefono'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_telefono'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Web'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_web'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>

                            <div className="col-12 mt-3">
                                <h5>Productos</h5>
                                {fields.map((item, index) => (
                                    <div key={item.id} className="border p-3 mb-2 rounded">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Nombre'}
                                                    register={register}
                                                    name={`productos.${index}.nombre`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'nombre'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Unidad de venta'}
                                                    register={register}
                                                    name={`productos.${index}.unidad_venta`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'unidad_venta'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Precio estimado'}
                                                    register={register}
                                                    name={`productos.${index}.precio_estimado`}
                                                    errors={errors}
                                                    type={'number'}
                                                    required={{ required: true }}
                                                    nameCheck={'precio_estimado'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Disponibilidad geográfica'}
                                                    register={register}
                                                    name={`productos.${index}.disponibilidad_geografica`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'disponibilidad_geografica'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <TextareaArray
                                                    label={'Descripción breve'}
                                                    register={register}
                                                    name={`productos.${index}.descripcion_breve`}
                                                    errors={errors}
                                                    required={{ required: true }}
                                                    nameCheck={'descripcion_breve'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                        </div>
                                        <button type="button" disabled={fields.length == 1 ? true : false} className="btn btn-danger mt-2" onClick={() => remove(index)}>Eliminar</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2 mx-2"
                                            onClick={() => append({
                                                nombre: "",
                                                descripcion_breve: "",
                                                unidad_venta: "",
                                                precio_estimado: "",
                                                disponibilidad_geografica: ""
                                            })}
                                            disabled={!fields.length || !isProductValid(fields.length - 1)} // Deshabilitar si el producto actual no es válido
                                        >
                                            Agregar Producto
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="col-12 text-start">
                                <button type="submit" className="btn btn-success mt-3">Guardar datos</button>
                            </div>
                        </div>
                    </form>
                }
                {
                    selectedOption.key == 'mis-servicios' &&
                    servicios &&
                    <Table
                        data={servicios}
                        columns={columns} />
                }
            </div>
        </>
    );
};

export default Servicios;
