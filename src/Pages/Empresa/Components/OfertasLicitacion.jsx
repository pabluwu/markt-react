import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, modalidades_choices, formas_pago_choices } from "../../../assets/variables";
import useFormattedDate from "../../../services/useFormattedDate";
import Table from "../../../Components/Table/Table";
import Popup from "../../../Components/Popup/Popup";

import DetalleIcon from "../../../assets/detalle-de-atencion.svg";
const OfertasLicitacion = ({ licitacion_id }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [verDetalle, setVerDetalle] = useState(false);
    const obtenerOfertas = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/servicio_licitacion/?licitacion_id=${licitacion_id}`, {
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

    const { data: ofertas, refetch: refetchOfertas } = useQuery(
        {
            queryKey: ['ofertas_by_licitacion', licitacion_id], // La clave ahora es un objeto
            queryFn: obtenerOfertas,
            enabled: !!licitacion_id,  // Solo se ejecuta si selected tiene un id
        }
    );

    console.log(ofertas);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'fecha_oferta',
                header: 'Fecha creación',
                cell: ({ getValue }) => {
                    return useFormattedDate(getValue());
                }
            },
            {
                accessorKey: 'servicio_ofertado.empresa.nombre_fantasia',
                header: 'Nombre empresa',
            },
            {
                accessorKey: 'servicio_ofertado.empresa.rut',
                header: 'Rut empresa',
            },
            {
                accessorKey: 'servicio_ofertado.descripcion',
                header: 'Descripción servicio',
            },
            {
                id: 'action',
                header: 'Acciones',
                cell: ({ row }) => {
                    return (
                        <div className="d-flex gap-4">
                            <span
                                data-tooltip="Revisar servicio"
                                onClick={() => {
                                    setSelectedItem(row.original);
                                    setVerDetalle(true);
                                }}
                            >
                                <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={DetalleIcon} alt="" />
                            </span>
                        </div>
                    )
                },
            }
        ],
        []
    );

    const content = (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Detalle de servicio</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setVerDetalle(!verDetalle)}></span>
            </div>

            <div className="modal-body">
                <div className="row">
                    <div className="col-6">
                        <p><strong>Descripción: </strong>{selectedItem?.servicio_ofertado?.descripcion}</p>
                    </div>
                    <div className="col-6">
                        <p><strong>Tiempo promedio de entrega: </strong>{selectedItem?.servicio_ofertado?.tiempo_entrega}</p>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <p><strong>Modalidad de atención:</strong></p>
                                <ul>
                                    {
                                        selectedItem?.servicio_ofertado?.modalidades_atencion?.map(item => (
                                            <li key={item}>
                                                {modalidades_choices[item] ? modalidades_choices[item].label : item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-6">
                                <p><strong>Formas de pago:</strong></p>
                                <ul>
                                    {
                                        selectedItem?.servicio_ofertado?.formas_pago?.map(item => (
                                            <li key={item}>
                                                {formas_pago_choices.find(i => i.id == item) ? formas_pago_choices.find(i => i.id == item)?.label : item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <p><strong>Certificaciones:</strong> {selectedItem?.servicio_ofertado?.certificaciones}</p>
                    </div>
                    <h5 style={{ borderTop: 'solid 1px #dee2e6', borderBottom: 'solid 1px #dee2e6' }} className={'py-2'}>Datos contacto</h5>

                    <div className="col-4">
                        <p><strong>Nombre: </strong>{selectedItem?.servicio_ofertado?.contacto_nombre}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Email: </strong>{selectedItem?.servicio_ofertado?.contacto_email}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Telefono: </strong>{selectedItem?.servicio_ofertado?.contacto_telefono}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Cargo: </strong>{selectedItem?.servicio_ofertado?.contacto_cargo}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Web: </strong>{selectedItem?.servicio_ofertado?.contacto_web}</p>
                    </div>
                    <h5 style={{
                        borderTop: 'solid 1px #dee2e6',
                        borderBottom: 'solid 1px #dee2e6'
                    }}
                        className={'py-2'}>Productos</h5>
                    {
                        selectedItem?.servicio_ofertado?.productos?.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-4">
                                    <p><strong>Nombre: </strong>{item?.nombre}</p>
                                </div>
                                <div className="col-4">
                                    <p><strong>Precio estimado: </strong>{item?.precio_estimado}</p>
                                </div>
                                <div className="col-4">
                                    <p><strong>Unidad de venta: </strong>{item?.unidad_venta}</p>
                                </div>
                                <div className="col-12">
                                    <p><strong>Descripción: </strong>{item?.descripcion_breve}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    );


    return (
        <>
            {
                ofertas &&
                ofertas.length > 0 &&
                <Table
                    columns={columns}
                    data={ofertas} />
            }
            {
                verDetalle &&
                <Popup children={content} show={verDetalle} />
            }
        </>
    )
}
export default OfertasLicitacion;
