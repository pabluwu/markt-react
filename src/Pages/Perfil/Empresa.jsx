import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/useEmpresas";
import { getAllPostByEmpresa } from "../../services/usePost";
import { api } from "../../assets/variables";
import { media_url } from "../../assets/variables";

import SeguirButton from "../../Components/SeguirButton/SeguirButton";
import Navbar from "../../Components/Navbar/Navbar";
import CardReputacion from "./Components/CardReputacion";
import Tab from "../../Components/Tab/Tab";
import Post from "../../Components/Post/Post";
import Table from "../../Components/Table/Table";
import useStore from "../../store/userStore";
import ContactarButton from "../../Components/ContactarButton/ContactarButton";

import SampleAvatar from '../../assets/SampleAvatar.png';
import './style.css';
const PerfilEmpresa = () => {
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'servicios', nombre: 'Servicios' }
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
            queryKey: ['comentarios', id], // La clave ahora es un objeto
            queryFn: obtenerServicios,
            enabled: !!id,  // Solo se ejecuta si selected tiene un id
        }
    );

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
                accessorKey: '',
                header: 'Acciones',
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
                                <CardReputacion />
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
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default PerfilEmpresa;