import './style.css';
import { Plus } from 'lucide-react';

const CardRepositorio = () => {
    return (
        <div className="rounded repositorio-card mt-3 py-3">
            <div className=" px-3">
                <p><strong>Repositorio</strong></p>
                <a className="btn btn-dark w-100 d-flex text-white align-items-center justify-content-center gap-2 mt-2" href="/repositorio/admin">
                    <Plus size={16} />
                    Gestionar documentos
                </a>
            </div>
        </div>
    )
}

export default CardRepositorio; 