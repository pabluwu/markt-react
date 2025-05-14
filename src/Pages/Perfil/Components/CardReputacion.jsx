const CardReputacion = ({ servicios, licitaciones, colaboradores, seguidores }) => {

    const reputacion = [
        { id: 1, nombre: 'Colaboradores' },
        { id: 2, nombre: 'Seguidores' },
        { id: 3, nombre: 'Servicios' },
        { id: 4, nombre: 'Licitaciones' },
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

                                        item.nombre == 'Servicios' ?
                                            servicios > 0 ?
                                                servicios : 0
                                            :
                                            ''
                                    }
                                    {
                                        item.nombre == 'Licitaciones' ?
                                            licitaciones > 0 ?
                                                licitaciones : 0
                                            :
                                            ''
                                    }
                                    {
                                        item.nombre == 'Colaboradores' ?
                                            colaboradores > 0 ?
                                                colaboradores : 0
                                            :
                                            ''
                                    }
                                    {
                                        item.nombre == 'Seguidores' ?
                                            seguidores > 0 ?
                                                seguidores : 0
                                            :
                                            ''
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