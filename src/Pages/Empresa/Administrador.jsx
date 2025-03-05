import { useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/useEmpresas";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ConfigurarEmpresa from "./Configurar";

const AdministradorEmpresa = () => {
    const [option, setOption] = useState({ key: 'publicaciones', nombre: 'Publicaciones' });
    const { id } = useParams();
    const { empresa, empresaIsLoading } = getEmpresa(id);

    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'servicios', nombre: 'Servicios' },
        { key: 'contactos', nombre: 'Contactos' },
        { key: 'configurar', nombre: 'Configurar' },
    ]

    const toggleOption = (option) => {
        setOption(option);
    }

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
                                    {opcion.nombre}
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
                                option.key == 'configurar' &&
                                <ConfigurarEmpresa empresa={empresa} />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
};

export default AdministradorEmpresa;