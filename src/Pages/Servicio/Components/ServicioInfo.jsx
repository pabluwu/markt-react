const ServicioInfo = ({ servicio }) => {
    return (
        <div className="mx-4">
            <div className="card container">
                <div className="card-body">
                    <h5 className="card-title">Información del Servicio Número: {servicio.id}</h5>
                    <div className="row">
                        <div className="col-m-12">
                            <label htmlFor="">Descripción</label>
                            <div className="form-control">
                                {servicio.descripcion}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Tiempo promedio de entrega</label>
                            <div className="form-control">
                                {servicio.tiempo_entrega}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Modalidad de atención</label>
                            <div className="form-control">
                                {servicio.modalidades_atencion}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Formas de pago</label>
                            <div className="form-control">
                                {servicio.formas_pago}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="">Certificaciones y garantías (Opcional)</label>
                            <div className="form-control">
                                {servicio.certificaciones}
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <h5>
                                Contacto
                            </h5>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">Nombre</label>
                            <div className="form-control">
                                {servicio.contacto_nombre ? servicio.contacto_nombre : 'No especifica'}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">Cargo</label>
                            <div className="form-control">
                                {servicio.contacto_cargo ? servicio.contacto_cargo : 'No especifica'}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">Email</label>
                            <div className="form-control">
                                {servicio.contacto_email ? servicio.contacto_email : 'No especifica'}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">Telefono</label>
                            <div className="form-control">
                                {servicio.contacto_telefono ? servicio.contacto_telefono : 'No especifica'}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">Web</label>
                            <div className="form-control">
                                {servicio.contacto_web ? servicio.contacto_web : 'No especifica'}
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <h5>
                                Productos
                            </h5>
                        </div>
                        {
                            servicio.productos.length > 0 &&
                            servicio.productos.map((producto, index) => (
                                <div key={index} className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Nombre {index + 1}</label>
                                        <div className="form-control">
                                            {producto.nombre ? producto.nombre : 'No especifica'}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Unidad Venta {index + 1}</label>
                                        <div className="form-control">
                                            {producto.unidad_venta ? producto.unidad_venta : 'No especifica'}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Precio estimado {index + 1}</label>
                                        <div className="form-control">
                                            {producto.precio_estimado ? producto.precio_estimado : 'No especifica'}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="">Descripción {index + 1}</label>
                                        <div className="form-control">
                                            {producto.descripcion_breve ? producto.descripcion_breve : 'No especifica'}
                                        </div>
                                    </div>
                                    <hr className="mt-4"/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ServicioInfo