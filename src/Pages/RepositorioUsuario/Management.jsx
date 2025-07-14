import { useState, useMemo, useEffect } from "react";
import {
    useRecursosInfinite,
    useDeleteRecurso
} from "../../services/useRecursosUsuarios";
import useFormattedDate from "../../services/useFormattedDate";
import useStore from "../../store/userStore";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Table from "../../Components/Table/Table";
import UploadForm from "./Components/UploadForm";
import EditarForm from "./Components/EditarForm";
import Popup from "../../Components/Popup/Popup";

import {
    Grid2x2Plus,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Trash2,
    Upload,
    Edit
} from "lucide-react"

const ManageRepositorio = () => {
    const [option, setOption] = useState({ key: 'recursos', nombre: 'Lista de Recursos' });
    const [editar, setEditar] = useState(false);
    const [selectedRecurso, setSelectedRecurso] = useState(null);
    const { user } = useStore();
    const opciones = [
        { key: 'recursos', nombre: 'Lista de Recursos', icon: <Grid2x2Plus size={18} /> },
        { key: 'recursos_subir', nombre: 'Subir un recurso', icon: <Upload size={18} /> },
    ]

    const toggleOption = (option) => {
        setOption(option);
    }

    const {
        recursos,
        fetchNextRecursos,
        hasMoreRecursos,
        isFetchingNextRecursos,
        isLoadingRecursos,
        isErrorRecursos,
        errorRecursos,
        refetchAllRecursos
    } = useRecursosInfinite({
        autoLoadAll: true,
        authorId: user?.id,
        authorType: "user",
    });


    const { mutate, isLoading, isSuccess, error } = useDeleteRecurso();

    const handleDelete = (id) => {
        if (confirm("¿Eliminar este recurso?")) {
            mutate(id, {
                onSuccess: () => {
                    // Refetch los recursos después de eliminar exitosamente
                    refetchAllRecursos();
                },
                onError: (error) => {
                    console.error("Error al eliminar el recurso:", error);
                }
            });
        }
    };

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
                accessorKey: 'fecha_subida',
                header: 'Fecha creación',
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
                                data-tooltip="Abrir">
                                <a
                                    className=""
                                    href={`/repositorio/archivo/${row.original.id}`}
                                    target="_blank">
                                    <ExternalLink size={18} color="#000" />
                                </a>
                            </span>
                            <span
                                data-tooltip="Eliminar"
                                onClick={() => {
                                    handleDelete(row.original.id)
                                }}>
                                {/* <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={EditIcon} alt="" /> */}
                                <Trash2 size={18} color="#000" />
                            </span>
                            <span
                                data-tooltip="Editar"
                                onClick={() => {
                                    setEditar(true);
                                    setSelectedRecurso(row.original);
                                }}>
                                {/* <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={EditIcon} alt="" /> */}
                                <Edit size={18} color="#000" />
                            </span>
                        </div>
                    )// This will help confirm the structure of each row's data
                },
            }
        ],
        []
    );

    const contentSidebar = (
        <>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title w-100 bg-white rounded shadow" id="sidebarLabel">
                    <div className="d-flex align-items-center justify-content-between py-3 px-4 gap-4">
                        Administración Repositorio
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleOption(opcion)
                                        }
                                        }>
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
            {/* {
                editar &&
                <Popup children={
                    <EditarForm
                        recurso={selectedRecurso}
                        setShow={setEditar}
                        show={editar}
                        refetch={refetchAllRecursos}
                        author_type={'user'}
                        author_id={user.id} />
                } show={editar} />
            } */}
            <Navbar />
            {
                recursos &&
                <>
                    <Sidebar content={contentSidebar} id={'sidebarManagement'} />
                    <div className="container-responsive" style={{ minHeight: '750px' }}>
                        <div className="container mt-4 ">
                            <h3> <strong>{option.nombre}</strong></h3>
                            {
                                option.key == 'recursos' &&
                                <>
                                    <div className="bg-white py-2 rounded shadow">
                                        <div className="px-3">
                                            <Table
                                                data={recursos}
                                                columns={columns} />
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                option.key == 'recursos_subir' &&
                                user &&
                                <UploadForm
                                    author_type={'user'}
                                    author_id={user.id}
                                />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ManageRepositorio;