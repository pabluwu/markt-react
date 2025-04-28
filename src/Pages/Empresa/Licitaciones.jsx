import { useEffect, useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFormattedDate from "../../services/useFormattedDate";
import Input from "../../Components/Input/Input";
import Textarea from "../../Components/Textarea/Textarea";
import Tab from "../../Components/Tab/Tab";
import Table from "../../Components/Table/Table";
import DetalleLicitacion from "./Components/DetalleLicitacion";
import EditarServicio from "./Components/EditarServicio";
import VerMensajes from "./Components/VerMensajes";
import DatePickerCustom from "../../Components/DatePicker/DatePicker";

import { api, formas_pago_choices, modalidades_choices } from "../../assets/variables";
import CopiarIcon from "../../assets/copiar-alt.svg";
import DetalleIcon from "../../assets/detalle-de-atencion.svg";
import EditIcon from "../../assets/editar.svg";
import MsgIcon from "../../assets/message.svg";

const Licitaciones = ({ empresa }) => {
    const [detalle, setDetalle] = useState(false);
    const [editar, setEditar] = useState(false);
    const [verMensajes, setVerMensajes] = useState(false);
    const [selectedLicitacion, setSelectedLicitacion] = useState(null);
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, reset } = useForm({});

    useEffect(() => {
        setValue('empresa', empresa.id);
    }, [empresa])

    const opciones = [
        { key: 'crear-licitacion', nombre: 'Crear Licitación' },
        { key: 'mis-licitaciones', nombre: 'Mis Licitaciones' },
        { key: 'detalle-licitacion', nombre: 'Mis Licitaciones', show: false }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);

    const obtenerLicitaciones = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/licitacion/?empresa_id=${empresa.id}`, {
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

    const { data: licitaciones, refetch: refetchLicitaciones } = useQuery(
        {
            queryKey: ['licitaciones', empresa.id], // La clave ahora es un objeto
            queryFn: obtenerLicitaciones,
            enabled: !!empresa.id,  // Solo se ejecuta si selected tiene un id
        }
    );

    // console.log(servicios);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/licitacion/`, {
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
            refetchLicitaciones();
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

    // console.log(servicios);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'titulo',
                header: 'Titulo',
            },
            {
                accessorKey: 'fecha_inicio',
                header: 'Fecha de inicio',
                cell: ({ getValue }) => {
                    return useFormattedDate(getValue());
                }
            },
            {
                accessorKey: 'fecha_fin',
                header: 'Fecha de termino',
                cell: ({ getValue }) => {
                    return useFormattedDate(getValue());
                }
            },
            {
                id: 'action',
                header: 'Acciones',
                cell: ({ row }) => {
                    // console.log(row); 
                    return (
                        <div className="d-flex gap-4">
                            <span
                                data-tooltip="Ver licitación"
                                onClick={() => {
                                    setDetalle(true);
                                    setSelectedLicitacion(row.original);
                                    setSelectedOption(opciones[2]);
                                }}
                            >
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={DetalleIcon} alt="" />
                            </span>
                            {/* <span
                                data-tooltip="Editar licitación"
                                onClick={() => {
                                    setEditar(true);
                                    setSelectedLicitacion(row.original);
                                }}>
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={EditIcon} alt="" />
                            </span>
                            <span
                                data-tooltip="Revisar mensajes"
                                onClick={() => {
                                    setVerMensajes(true);
                                    setSelectedLicitacion(row.original);
                                }}>
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={MsgIcon} alt="" />
                            </span> */}
                        </div>
                    )// This will help confirm the structure of each row's data
                },
            }

        ],
        []
    );

    return (
        <>
            {
                editar &&
                <EditarServicio
                    show={editar}
                    setShow={setEditar}
                    servicio={selectedLicitacion}
                    refetch={refetchLicitaciones}
                    idEmpresa={empresa.id} />
            }
            {
                verMensajes &&
                <VerMensajes
                    show={verMensajes}
                    setShow={setVerMensajes}
                    servicio={selectedLicitacion} />
            }
            <Tab
                opciones={opciones.filter(opcion => opcion.show !== false)}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />
            <div className="rounded mis-empresas-card p-3">
                {
                    selectedOption.key == 'detalle-licitacion' &&
                    detalle &&
                    <DetalleLicitacion
                        show={detalle}
                        setShow={setDetalle}
                        licitacion={selectedLicitacion}
                        setSelectedOption={setSelectedOption} />
                }
                {
                    selectedOption.key == 'crear-licitacion' &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <h5>
                                    Crea una licitación
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <Input
                                    label={'Titulo licitación'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'titulo'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-m-12">
                                <Textarea
                                    label={'Descripción'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'descripcion'}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-6">
                                <DatePickerCustom
                                    label={'Fecha de inicio'}
                                    name={'fecha_inicio'}
                                    control={control}
                                    errors={errors}
                                    required={{ required: true }} />
                            </div>
                            <div className="col-md-6">
                                <DatePickerCustom
                                    label={'Fecha de fin'}
                                    name={'fecha_fin'}
                                    control={control}
                                    errors={errors}
                                    required={{ required: true }} />
                            </div>

                            <div className="col-12 text-start">
                                <button type="submit" className="btn btn-success mt-3">Guardar licitación</button>
                            </div>
                        </div>
                    </form>
                }
                {
                    selectedOption.key == 'mis-licitaciones' &&
                    licitaciones &&
                    <Table
                        data={licitaciones}
                        columns={columns} />
                }
            </div>
        </>
    );
};

export default Licitaciones;
