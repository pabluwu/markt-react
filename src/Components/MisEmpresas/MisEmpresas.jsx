import { useMisEmpresas } from "../../services/useEmpresas";
import { Link } from "react-router-dom";
const MisEmpresas = ({ user }) => {

    const { misEmpresas } = useMisEmpresas();
    // console.log(misEmpresas);
    return (
        <div className="rounded mis-empresas-card py-3">
            <div className=" px-3">
                <h2>Administrar</h2>
                <ul>
                    {
                        misEmpresas &&
                        misEmpresas.map(item => (
                            <li key={item.id}>
                                <Link to={`/empresa/${item.id}`} className="text-decoration-none">{item.nombre_empresa}</Link>
                            </li>
                        ))
                    }
                </ul>
                <a className="btn btn-primary mt-3 text-white" href="/crear-empresa">
                    Crear empresa
                </a>
            </div>
        </div>
    )
}

export default MisEmpresas;