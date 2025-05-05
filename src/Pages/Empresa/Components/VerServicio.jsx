import Popup from "../../../Components/Popup/Popup";

const VerServicio = ({ show, setShow, servicio }) => {
    console.log(servicio);
    const content = (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Detalle de servicio</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setShow(!show)}></span>
            </div>

            <div className="modal-body">
                <div className="row">
                    <div className="col-6">
                        <p><strong>Descripción: </strong>{servicio?.descripcion}</p>
                    </div>
                    <div className="col-6">
                        <p><strong>Tiempo promedio de entrega: </strong>{servicio?.tiempo_entrega}</p>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <p><strong>Modalidad de atención:</strong></p>
                                <ul>
                                    {
                                        servicio?.modalidades_atencion?.map(item => (
                                            <li key={item}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-6">
                                <p><strong>Formas de pago:</strong></p>
                                <ul>
                                    {
                                        servicio?.formas_pago?.map(item => (
                                            <li key={item}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <p><strong>Archivos:</strong></p>
                        <ul>
                            {
                                servicio?.archivos?.map((item, index) => (
                                    <li key={item.archivo}>
                                        <a href={item.archivo} target="_blank">{`Archivo ${index+1}`}</a>
                                    </li>
                                ))
                            }
                        </ul>	
                    </div>
                    <div className="col-12">
                        <p><strong>Certificaciones:</strong> {servicio?.certificaciones}</p>
                    </div>
                    <h5 style={{ borderTop: 'solid 1px #dee2e6', borderBottom: 'solid 1px #dee2e6' }} className={'py-2'}>Datos contacto</h5>

                    <div className="col-4">
                        <p><strong>Nombre: </strong>{servicio?.contacto_nombre}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Email: </strong>{servicio?.contacto_email}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Telefono: </strong>{servicio?.contacto_telefono}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Cargo: </strong>{servicio?.contacto_cargo}</p>
                    </div>
                    <div className="col-4">
                        <p><strong>Web: </strong>{servicio?.contacto_web}</p>
                    </div>
                    <h5 style={{
                        borderTop: 'solid 1px #dee2e6',
                        borderBottom: 'solid 1px #dee2e6'
                    }}
                        className={'py-2'}>Productos</h5>
                    {
                        servicio?.productos?.map((item,index) => (
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

            <Popup show={show} children={content} />

        </>
    )
}

export default VerServicio;