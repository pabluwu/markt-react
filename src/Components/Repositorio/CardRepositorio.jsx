import './style.css';

const CardRepositorio = () => {
    return (
        <div className="rounded repositorio-card mt-3 py-3">
            <div className=" px-3">
                <h2>Repositorio</h2>
                <a className="btn btn-primary mt-3 text-white" href="/repositorio/subir">
                    Agregar documento
                </a>
            </div>
        </div>
    )
}

export default CardRepositorio; 