import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getEmpresasCargos } from "../../../services/useEmpresas";
import { toast } from "react-toastify";

import Tab from "../../../Components/Tab/Tab";
import Table from "../../../Components/Table/Table";

import { api } from "../../../assets/variables";

const Cargos = ({ empresa, cargos, refetchCargos }) => {
    const opciones = [
        { key: 'administrar_cargos', nombre: 'Solicitudes' },
        { key: 'cargos_actuales', nombre: 'Cargos actuales' },
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);

    console.log(cargos)
    const updateCargo = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/cargo_empresa/${data.id}/actualizar-validacion/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            return response.json();
        },
        onSuccess: async (data) => {
            toast.success('Cargo aprobado exitosamente');
            refetchCargos();
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.detail || error.message || 'Hubo un error al actualizar el usuario';
            toast.error(`Error: ${errorMessage}`);
            console.log(errorMessage);
        },
    });

    const columnsSolicitudes = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'user',
                header: 'Autor',
            },
            {
                accessorKey: 'cargo',
                header: 'Cargo',
            },
            {
                id: 'action',
                header: 'Acciones',
                cell: ({ row }) => {
                    // console.log(row); 
                    return (
                        <div className="d-flex gap-4">
                            <span
                                data-tooltip="Aceptar cargo"
                                onClick={() => {
                                    updateCargo.mutate({ id: row.original.id, is_valido: true });
                                }}>
                                {/* <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={CopiarIcon} alt="" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0f0f0f" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                </svg>
                            </span>
                        </div>
                    )// This will help confirm the structure of each row's data
                },
            }

        ],
        []
    );

    const columnsActuales = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'user',
                header: 'Autor',
            },
            {
                accessorKey: 'cargo',
                header: 'Cargo',
            },
            // {
            //     id: 'action',
            //     header: 'Acciones',
            //     cell: ({ row }) => {
            //         // console.log(row); 
            //         return (
            //             <div className="d-flex gap-4">
            //                 <span
            //                     data-tooltip="Aceptar cargo"
            //                     onClick={() => {
            //                         setCopiar(true);
            //                         setSelectedServicio(row.original);
            //                     }}>
            //                     {/* <img
            //                         style={{ width: '24px', height: '24px' }}
            //                         src={CopiarIcon} alt="" /> */}
            //                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0f0f0f" class="bi bi-check2-circle" viewBox="0 0 16 16">
            //                         <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
            //                         <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            //                     </svg>
            //                 </span>
            //             </div>
            //         )// This will help confirm the structure of each row's data
            //     },
            // }

        ],
        []
    );

    return (
        <>
            <Tab
                opciones={opciones.filter(opcion => opcion.show !== false)}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />

            <div className="rounded mis-empresas-card p-3">
                {
                    selectedOption.key == 'administrar_cargos' &&
                    cargos &&
                    <Table
                        data={cargos.filter(item => item.is_valido == false)}
                        columns={columnsSolicitudes} />
                }
                {
                    selectedOption.key == 'cargos_actuales' &&
                    cargos &&
                    <Table
                        data={cargos.filter(item => item.is_valido == true)}
                        columns={columnsActuales} />
                }
            </div>
        </>

    )
}

export default Cargos;