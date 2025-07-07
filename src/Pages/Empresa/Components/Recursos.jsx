import {
    useState,
    useMemo
} from "react";

import {
    useRecursosInfinite,
    useDeleteRecurso
} from "../../../services/useRecursosUsuarios";

import {
    ExternalLink,
    Trash2,
    Edit
} from "lucide-react"

import useFormattedDate from "../../../services/useFormattedDate";

import EditarForm from "../../RepositorioUsuario/Components/EditarForm";
import Popup from "../../../Components/Popup/Popup";
import Table from "../../../Components/Table/Table";

const RecursosEmpresa = ({ user_id, author_type }) => {
    const [editar, setEditar] = useState(false);
    const [selectedRecurso, setSelectedRecurso] = useState(null);
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
        authorId: user_id,
        authorType: author_type,
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

    return (
        <>
            {
                editar &&
                <Popup children={
                    <EditarForm
                        recurso={selectedRecurso}
                        setShow={setEditar}
                        show={editar}
                        refetch={refetchAllRecursos}
                        author_type={'empresa'}
                        author_id={user_id} />
                } show={editar} />
            }
            <div className="bg-white py-2 rounded shadow">
                <div className="px-3">
                    <Table
                        data={recursos}
                        columns={columns} />
                </div>
            </div>
        </>
    )
}

export default RecursosEmpresa;