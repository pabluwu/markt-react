import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getEmpresa, getEmpresasCargos, verSolicitudesContacto } from "../../services/useEmpresas";
import { useQuery } from "@tanstack/react-query";
import { FileText, Eye, ChevronDown, ChevronRight, Briefcase, Users, Award, Settings, Building2, User, Grid2X2Plus, Upload } from "lucide-react";
import { media_url } from "../../assets/variables";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ConfigurarEmpresa from "./Configurar";
import PublicacionesEmpresa from "./Publicaciones";
import Servicios from "./Servicios";
import ContactosEmpresa from "./Contactos";
import Licitaciones from "./Licitaciones";
import Cargos from "./Components/Cargos";
import RecursosEmpresa from "./Components/Recursos";
import UploadForm from "../RepositorioUsuario/Components/UploadForm";

const AdministradorEmpresa = () => {
    const [option, setOption] = useState({ key: 'publicaciones', nombre: 'Publicaciones' });
    const { id } = useParams();
    const { empresa, empresaIsLoading } = getEmpresa(id);

    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones', icon: <FileText size={18} /> },
        { key: 'perfil', nombre: 'Ver perfil', icon: <Eye size={18} /> },
        { key: 'servicios', nombre: 'Servicios', icon: <Briefcase size={18} /> },
        { key: 'contactos', nombre: 'Contactos', icon: <Users size={18} /> },
        { key: 'cargos', nombre: 'Revisar Cargos', icon: <Award size={18} /> },
        { key: 'configurar', nombre: 'Configurar', icon: <Settings size={18} /> },
        { key: 'licitaciones', nombre: 'Licitaciones', icon: <Building2 size={18} /> },
        { key: 'recursos', nombre: 'Lista de Recursos', icon: <Grid2X2Plus size={18} /> },
        { key: 'recursos_subir', nombre: 'Subir un recurso', icon: <Upload size={18} /> },
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

    // console.log(cargos);
    const contentSidebar = (
        <>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title w-100 bg-white rounded shadow" id="sidebarLabel">
                    <div className="d-flex align-items-center justify-content-between py-3 px-4 gap-4">
                        {
                            empresa &&
                                empresa.imagen_perfil ?
                                <img className="rounded" style={{ maxWidth: '48px' }} src={
                                    `${media_url}/${empresa.imagen_perfil}`
                                } alt="" />
                                :
                                <User size={24} />
                        }
                        {empresa?.nombre_empresa}
                    </div>
                </h5>
            </div>
            <div className="offcanvas-body">
                <div className="rounded bg-white shadow">
                    <ul className="list-group list-group-flush py-3">
                        {
                            opciones.map(opcion => (
                                <li className="list-group-item bg-transparent border-0" key={opcion.key}>
                                    <span
                                        className="text-decoration-none cursor-pointer"
                                        onClick={() => toggleOption(opcion)}>
                                        {
                                            option.key == opcion.key ?
                                                <>
                                                    <span
                                                        href="#"
                                                        className="d-flex align-items-center text-white bg-dark rounded-3 px-3 py-2 mb-2 text-decoration-none"
                                                    >
                                                        <div className="bg-secondary p-2 rounded me-2 d-flex align-items-center justify-content-center">
                                                            {opcion.icon}
                                                        </div>
                                                        <span className="flex-grow-1">{opcion.nombre}</span>
                                                        {
                                                            opcion.key == 'contactos' &&
                                                            <span class="badge bg-primary mx-2">{solicitudes?.filter(item => item.estado == 0).length}</span>
                                                        }
                                                        {
                                                            opcion.key == 'cargos' &&
                                                            <span class="badge bg-primary mx-2">{cargos?.filter(item => item.is_valido == false).length}</span>
                                                        }
                                                        <ChevronDown className="ms-auto" size={18} />
                                                    </span>
                                                </>
                                                :
                                                <>
                                                    <span
                                                        href="#"
                                                        className="d-flex align-items-center text-dark px-3 py-2 rounded text-decoration-none"
                                                    >
                                                        <div className="bg-light p-2 rounded me-2 d-flex align-items-center justify-content-center">
                                                            {opcion.icon}
                                                        </div>
                                                        <span className="flex-grow-1">{opcion.nombre}</span>
                                                        {
                                                            opcion.key == 'cargos' &&
                                                            <span class="badge bg-dark mx-2">{cargos?.filter(item => item.is_valido == false).length}</span>
                                                        }
                                                        {
                                                            opcion.key == 'contactos' &&
                                                            <span class="badge bg-dark mx-2">{solicitudes?.filter(item => item.estado == 0).length}</span>
                                                        }
                                                        <ChevronRight className="ms-auto text-muted" size={18} />
                                                    </span>
                                                </>

                                        }
                                    </span>
                                </li>
                            ))
                        }

                    </ul>
                </div>
                {/* Lista de enlaces */}
            </div>
        </>
    )
    return (
        <>
            <Navbar />
            {
                empresa &&
                <>
                    <Sidebar content={contentSidebar} id={'sidebarAdministrador'}/>
                    <div className="container-responsive" style={{minHeight: '750px'}}>
                        <div className="container mt-4 ">
                            <h3> <strong>{option.nombre}</strong></h3>
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
                            {
                                option.key == 'recursos' &&
                                <RecursosEmpresa
                                    author_type={'empresa'}
                                    user_id={id} />
                            }
                            {
                                option.key == 'recursos_subir' &&
                                <UploadForm
                                    author_type={'empresa'}
                                    author_id={id}
                                />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
};

export default AdministradorEmpresa;