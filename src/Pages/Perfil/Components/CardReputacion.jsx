const CardReputacion = ({ servicios }) => {

    const reputacion = [
        { id: 1, nombre: 'Clasificación' },
        { id: 2, nombre: 'Contactos' },
        { id: 3, nombre: 'Seguidores' },
        { id: 4, nombre: 'Servicios' },
    ]
    return (
        <>
            <div className="row">
                {
                    reputacion.map(item => (
                        <div className="col-lg-3" key={item.id}>
                            <div className="box-datos rounded d-flex flex-column justify-content-center align-items-center">
                                <h5>
                                    <strong>
                                        {item.nombre}
                                    </strong>
                                </h5>
                                <h4>
                                    {

                                        item.nombre == 'Servicios' &&
                                            servicios > 0 ?
                                            servicios
                                            :
                                            0
                                    }
                                </h4>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}
export default CardReputacion;