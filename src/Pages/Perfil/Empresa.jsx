import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/useEmpresas";
import { getAllPostByEmpresa } from "../../services/usePost";
import { api } from "../../assets/variables";
import { media_url } from "../../assets/variables";
import useFormattedDate from "../../services/useFormattedDate";

import SeguirButton from "../../Components/SeguirButton/SeguirButton";
import Navbar from "../../Components/Navbar/Navbar";
import CardReputacion from "./Components/CardReputacion";
import Tab from "../../Components/Tab/Tab";
import Post from "../../Components/Post/Post";
import Table from "../../Components/Table/Table";
import useStore from "../../store/userStore";
import ContactarButton from "../../Components/ContactarButton/ContactarButton";


import DetalleIcon from "../../assets/detalle-de-atencion.svg";
import SampleAvatar from '../../assets/SampleAvatar.png';
import './style.css';
const PerfilEmpresa = () => {
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'servicios', nombre: 'Servicios' },
        { key: 'licitacion', nombre: 'Licitaciones' }
    ]
    const { user } = useStore();
    const [selectedOption, setSelectedOption] = useState(opciones[0]);
    const { id } = useParams();
    const { postsEmpresa } = getAllPostByEmpresa(id);
    const { empresa, empresaIsLoading, error } = getEmpresa(id);

    const obtenerServicios = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/servicios/?empresa_id=${id}`, {
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
            queryKey: ['comentarios', id],
            queryFn: obtenerServicios,
            enabled: !!id,
        }
    );

    const obtenerLicitaciones = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/licitacion/?empresa_id=${id}`, {
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
            queryKey: ['licitaciones', id], // La clave ahora es un objeto
            queryFn: obtenerLicitaciones,
            enabled: !!id,  // Solo se ejecuta si selected tiene un id
        }
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
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
                    return (
                        <div className="d-flex gap-4">
                            <span data-tooltip="Revisar servicio">
                                <a href={`/servicio/${row.original.id}`}>
                                    <img
                                        style={{ width: '24px', height: '24px' }}
                                        src={DetalleIcon} alt="" />
                                </a>
                            </span>
                        </div>
                    )
                },
            }
        ],
        []
    );

    const columns2 = useMemo(
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
                    return (
                        <div className="d-flex gap-4">
                            <span
                                data-tooltip="Ver licitación"
                            >
                                <a href={`/licitacion/${row.original.id}`}>
                                    <img
                                        style={{ width: '24px', height: '24px' }}
                                        src={DetalleIcon} alt="" />
                                </a>
                            </span>
                        </div>
                    )
                },
            }
        ],
        []
    );
    return (
        <>
            <Navbar />
            {
                !empresa ?
                    <div className="d-flex justify-content-center mt-5">
                        <h1>Not found empresa</h1>
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-lg-3">
                                <div className="contenedorPerfilEmpresa">
                                    <div className="cardEmpresa">
                                        <div className="text-center">
                                            <img className="rounded" src={
                                                empresa.imagen_perfil ?
                                                    `${media_url}/${empresa.imagen_perfil}`
                                                    :
                                                    SampleAvatar
                                            } alt="" />
                                            {
                                                empresa &&
                                                <h2>{empresa.nombre_fantasia}</h2>
                                            }
                                        </div>
                                    </div>
                                    {
                                        user &&
                                        id &&
                                        <SeguirButton
                                            id_seguido={id}
                                            type_seguido={'empresa'}
                                            id_seguidor={user.id}
                                            type_seguidor={'user'} />
                                    }
                                    {
                                        user &&
                                        id &&
                                        <ContactarButton
                                            type={'empresa'}
                                            id={id} />
                                    }
                                </div>
                            </div>
                            <div className="col-lg-9">
                                {
                                    servicios &&
                                    <CardReputacion servicios={servicios.length} />
                                }
                                <Tab
                                    opciones={opciones}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption} />

                                {
                                    selectedOption.key == 'publicaciones' &&
                                    postsEmpresa &&
                                    <Post posts={postsEmpresa} />
                                }
                                {
                                    selectedOption.key == 'servicios' &&
                                    servicios &&
                                    <div className="mis-empresas-card px-4 mt-3">
                                        <Table
                                            data={servicios}
                                            columns={columns} />
                                    </div>
                                }
                                {
                                    selectedOption.key == 'licitacion' &&
                                    licitaciones &&
                                    <div className="mis-empresas-card px-4 mt-3">
                                        <Table
                                            data={licitaciones}
                                            columns={columns2} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default PerfilEmpresa;