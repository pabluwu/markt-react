import { useMisEmpresas } from "../../services/useEmpresas";
import { Link } from "react-router-dom";
import { Building2, Users, Plus } from "lucide-react";
const MisEmpresas = ({ user }) => {

    const { misEmpresas } = useMisEmpresas();
    // console.log(misEmpresas);
    return (
        // <div className="rounded mis-empresas-card py-3">
        //     <div className=" px-3">
        //         <h2>Administrar</h2>
        //         <ul>
        //             {
        //                 misEmpresas &&
        //                 misEmpresas.map(item => (
        //                     <li key={item.id}>
        //                         <Link to={`/empresa/${item.id}`} className="text-decoration-none">{item.nombre_fantasia}</Link>
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //         <a className="btn btn-primary mt-3 text-white" href="/crear-empresa">
        //             Crear empresa
        //         </a>
        //     </div>
        // </div>
        <div className="card p-3 border-0 shadow-sm rounded-4" style={{ maxWidth: '400px' }}>
            <h6 className="mb-3 fw-semibold">Administrar</h6>
            <div className="d-flex flex-column gap-2">
                {
                    misEmpresas &&
                    misEmpresas.map((company, index) => (
                        <Link to={`/empresa/${company.id}`} className="text-decoration-none">

                            <div key={index} className="bg-light rounded-3 p-3 d-flex justify-content-between align-items-start">
                                <div className="d-flex gap-2">
                                    <div className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center">
                                        <Building2 size={20} className="text-secondary" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{company.nombre_fantasia}</div>
                                        <small className="text-muted d-flex align-items-center gap-2">
                                            {'Empresa'}
                                            <span className="d-flex align-items-center gap-1">
                                                <Users size={14} />
                                                {company.users}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                                <span className="badge bg-success-subtle text-success fw-normal px-2 py-1 rounded-pill">
                                    {'Activa'}
                                </span>
                            </div>
                        </Link>
                    ))}
                <a href="/crear-empresa" className="btn btn-dark w-100 d-flex text-white align-items-center justify-content-center gap-2 mt-2">
                    <Plus size={16} />
                    Crear empresa
                </a>
            </div>
        </div>
    )
}

export default MisEmpresas;