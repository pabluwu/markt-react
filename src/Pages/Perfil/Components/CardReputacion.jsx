const CardReputacion = () => {

    const reputacion = [
        { id: 1, nombre: 'estrella1' },
        { id: 2, nombre: 'estrella2' },
        { id: 3, nombre: 'estrella3' },
        { id: 4, nombre: 'estrella4' },
    ]
    return (
        <>
            <div className="row">
                {
                    reputacion.map(item => (
                        <div className="col-lg-3" key={item.id}>
                            <div className="box-datos rounded d-flex justify-content-center align-items-center">
                                {item.nombre}
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}
export default CardReputacion;