import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Popup from "../../../Components/Popup/Popup";
import Table from "../../../Components/Table/Table";

import { api } from "../../../assets/variables";

const VerMensajes = ({ show, setShow, servicio }) => {

    console.log(servicio);
    const obtenerMensajes = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/servicios/${servicio.id}/contactos/`, {
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

    const { data: mensajes, refetch: refetchMensajes } = useQuery(
        {
            queryKey: ['mensajes', servicio.id], // La clave ahora es un objeto
            queryFn: obtenerMensajes,
            enabled: !!servicio.id,  // Solo se ejecuta si selected tiene un id
        }
    );

    console.log(mensajes);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'nombre',
                header: 'Nombre',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'telefono',
                header: 'Telefono',
            },
            {
                accessorKey: 'mensaje',
                header: 'Mensaje',
            },

        ],
        []
    );
    const content = (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Estos usuarios han querido tomar contacto por este servicio.</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setShow(!show)}></span>
            </div>
            <div className="modal-body">

                {
                    mensajes &&
                    <Table
                        data={mensajes}
                        columns={columns} />
                }
            </div>
        </>

    )
    return (
        <>
            <Popup children={content} show={show} />
        </>
    )
}

export default VerMensajes;