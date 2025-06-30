import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEmpresas } from "../../services/useEmpresas";
import useFormattedDate from "../../services/useFormattedDate";

import Table from "../../Components/Table/Table";
import Navbar from "../../Components/Navbar/Navbar";

import { ExternalLink } from "lucide-react";

const ListEmpresas = () => {

    const { data: empresas, refetch: refetchEmpresas } = useQuery(
        {
            queryKey: ['empresas'], // La clave ahora es un objeto
            queryFn: getAllEmpresas,
        }
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'rut',
                header: 'Rut'
            },
            {
                accessorKey: 'nombre_fantasia',
                header: 'Nombre fantasía',
            },
            {
                accessorKey: 'fecha_creacion',
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
                                    href={`/c/${row.original.id}`}
                                    target="_blank">
                                    <ExternalLink size={18} color="#000" />
                                </a>
                            </span>
                        </div>
                    )// This will help confirm the structure of each row's data
                },
            }
        ],
        []
    );

    console.log(empresas);

    return (
        <>
            <Navbar />
            {
                empresas &&
                <div className="container">
                    <div className="p-4 mt-4 rounded shadow-sm bg-white">
                        <Table
                            data={empresas}
                            columns={columns}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default ListEmpresas;