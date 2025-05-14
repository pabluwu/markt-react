import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getEmpresa, getEmpresasCargos, verSolicitudesContacto } from "../../services/useEmpresas";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ConfigurarEmpresa from "./Configurar";
import PublicacionesEmpresa from "./Publicaciones";
import Servicios from "./Servicios";
import ContactosEmpresa from "./Contactos";
import Licitaciones from "./Licitaciones";
import Cargos from "./Components/Cargos";

const AdministradorEmpresa = () => {
    const [option, setOption] = useState({ key: 'publicaciones', nombre: 'Publicaciones' });
    const { id } = useParams();
    const { empresa, empresaIsLoading } = getEmpresa(id);

    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'perfil', nombre: 'Ver perfil' },
        { key: 'servicios', nombre: 'Servicios' },
        { key: 'contactos', nombre: 'Contactos' },
        { key: 'cargos', nombre: 'Revisar Cargos' },
        { key: 'configurar', nombre: 'Configurar' },
        { key: 'licitaciones', nombre: 'Licitaciones' },
    ]

    const toggleOption = (option) => {
        setOption(option);
    }

    const { data: cargos, refetch: refetchCargos } = useQuery(
        {
            queryKey: ['cargos_empresas', id], // La clave ahora es un objeto
            queryFn: () => getEmpresasCargos(id, null),
        }
    );

    const { data: solicitudes, refetch: solicitudesRefetch } = useQuery(
        {
            queryKey: ['solicitudes_length', id],
            queryFn: () => verSolicitudesContacto(id, 'empresa', 0),
            enabled: true
        }
    );

    console.log(cargos);
    const contentSidebar = (
        <>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarLabel">
                    {empresa?.nombre_empresa}
                </h5>
            </div>
            <div className="offcanvas-body">
                {/* Lista de enlaces */}
                <ul className="list-group list-group-flush">
                    {
                        opciones.map(opcion => (
                            <li className="list-group-item" key={opcion.key}>
                                <span
                                    className="text-decoration-none cursor-pointer"
                                    onClick={() => toggleOption(opcion)}>
                                    {
                                        option.key == opcion.key ?
                                            <>
                                                <strong>
                                                    {opcion.nombre}
                                                </strong>
                                                {
                                                    opcion.key == 'contactos' &&
                                                    <span class="badge bg-primary mx-2">{solicitudes?.filter(item => item.estado == 0).length}</span>
                                                }
                                                {
                                                    opcion.key == 'cargos' &&
                                                    <span class="badge bg-primary mx-2">{cargos?.filter(item => item.is_valido == false).length}</span>
                                                }
                                            </>
                                            :
                                            <>
                                                {opcion.nombre}
                                                {
                                                    opcion.key == 'cargos' &&
                                                    <span class="badge bg-dark mx-2">{cargos?.filter(item => item.is_valido == false).length}</span>
                                                }
                                                {
                                                    opcion.key == 'contactos' &&
                                                    <span class="badge bg-dark mx-2">{solicitudes?.filter(item => item.estado == 0).length}</span>
                                                }
                                            </>

                                    }
                                </span>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
    return (
        <>
            <Navbar />
            {
                empresa &&
                <>
                    <Sidebar content={contentSidebar} />
                    <div className="container-responsive">
                        <div className="container mt-4 ">
                            <h3>{option.nombre}</h3>
                            {
                                option.key == 'publicaciones' &&
                                <PublicacionesEmpresa empresa={empresa} />
                            }
                            {
                                option.key == 'configurar' &&
                                <ConfigurarEmpresa empresa={empresa} />
                            }
                            {
                                option.key == 'perfil' &&
                                <Navigate to={`/c/${empresa.id}`} />
                            }
                            {
                                option.key == 'servicios' &&
                                <Servicios empresa={empresa} />
                            }
                            {
                                option.key == 'cargos' &&
                                <Cargos empresa={empresa} cargos={cargos} refetchCargos={refetchCargos} />
                            }
                            {
                                option.key == 'contactos' &&
                                <ContactosEmpresa
                                    id={id}
                                    type='empresa'
                                    refetchLength={solicitudesRefetch} />
                            }
                            {
                                option.key == 'licitaciones' &&
                                <Licitaciones empresa={empresa} />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
};

export default AdministradorEmpresa;