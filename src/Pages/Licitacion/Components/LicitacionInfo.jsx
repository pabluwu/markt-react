import useFormattedDate from "../../../services/useFormattedDate"
const LicitacionInfo = ({ licitacion }) => {
    return (
        <div className="mx-4">
            <div className="card container">
                <div className="card-body">
                    <h5 className="card-title">Información de la licitación número: {licitacion.id}</h5>
                    <div className="row">
                        <div className="col-m-12 mt-3">
                            <label htmlFor="">Título</label>
                            <div className="form-control">
                                {licitacion.titulo}
                            </div>
                        </div>
                        <div className="col-m-12 mt-3">
                            <label htmlFor="">Descripción</label>
                            <div className="form-control">
                                {licitacion.descripcion}
                            </div>
                        </div>
                        <div className="col-6 mt-3">
                            <label htmlFor="">Fecha de inicio</label>
                            <div className="form-control">
                                {useFormattedDate(licitacion?.fecha_inicio)}
                            </div>
                        </div>
                        <div className="col-6 mt-3">
                            <label htmlFor="">Fecha de término</label>
                            <div className="form-control">
                                {useFormattedDate(licitacion?.fecha_fin)}
                            </div>
                        </div>
                        {
                            licitacion.archivos &&
                            licitacion.archivos.length > 0 &&
                            licitacion.archivos.map((item, index) => (
                                <div className="col-md-4 mt-3" key={item.archivo}>
                                    <label htmlFor="">{`Archivo ${index + 1}`}</label>
                                    <a href={item.archivo} target="_blank" className="form-control">
                                        {item.archivo.split('/').pop()}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LicitacionInfo