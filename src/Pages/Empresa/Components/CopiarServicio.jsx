import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Popup from "../../../Components/Popup/Popup";
import Textarea from "../../../Components/Textarea/Textarea";
import Input from "../../../Components/Input/Input";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import InputArray from "../../../Components/Input/InputArray";
import TextareaArray from "../../../Components/Textarea/TextareaArray";

import { api, modalidades_choices, formas_pago_choices } from "../../../assets/variables";
const CopiarServicio = ({ show, setShow, servicio, refetch, idEmpresa }) => {

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

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productos"
    });

    const isProductValid = (index) => {
        const product = watch(`productos.${index}`);
        return product?.nombre && product?.descripcion_breve && product?.unidad_venta && product?.precio_estimado && product?.disponibilidad_geografica;
    };

    useEffect(() => {
        if (servicio) {
            setValue('empresa', idEmpresa);
            setValue('descripcion', servicio.descripcion);
            setValue('tiempo_entrega', servicio.tiempo_entrega);
            setValue('modalidades_atencion', servicio.modalidades_atencion);
            setValue('formas_pago', servicio.formas_pago);
            setValue('certificaciones', servicio.certificaciones);
            setValue('contacto_nombre', servicio.contacto_nombre);
            setValue('contacto_cargo', servicio.contacto_cargo);
            setValue('contacto_email', servicio.contacto_email);
            setValue('contacto_telefono', servicio.contacto_telefono);
            setValue('contacto_web', servicio.contacto_web);

            remove();

            servicio.productos.map((p, index) => {
                setValue(`productos.${index}.nombre`, p.nombre)
                setValue(`productos.${index}.unidad_venta`, p.unidad_venta)
                setValue(`productos.${index}.precio_estimado`, p.precio_estimado)
                setValue(`productos.${index}.disponibilidad_geografica`, p.disponibilidad_geografica)
                setValue(`productos.${index}.descripcion_breve`, p.descripcion_breve)
            })
        }
    }, [servicio]);

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
            refetch();
            setShow(false);
        },
        onError: (error) => {
            console.error('Error:', error);
            alert('Hubo un error al crear el servicio');
        },
    });
    console.log(servicio);

    const onSubmit = (data) => {
        mutation.mutate(data);
    };
    const content = (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Copiar servicio</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setShow(!show)}></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                    <div className="row">
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
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-success mt-3">Copiar servicio</button>
                    <span className="btn btn-secondary mt-3" onClick={() => setShow(false)}>Cancelar</span>
                    {/* <span className="btn btn-azul" onClick={onSubmit}>Publicar</span> */}
                </div>
            </form>
        </>
    );

    return (
        <>
            <Popup children={content} show={show} />
        </>
    )
}

export default CopiarServicio;