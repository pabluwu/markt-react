import './style.css';
import { Plus } from 'lucide-react';

const CardRepositorio = ({titulo, textoBoton, link}) => {
    return (
        <div className="rounded repositorio-card mt-3 py-3">
            <div className=" px-3">
                <p><strong>{titulo}</strong></p>
                <a className="btn btn-dark w-100 d-flex text-white align-items-center justify-content-center gap-2 mt-2" href={link}>
                    <Plus size={16} />
                    {textoBoton}
                    
                </a>
            </div>
        </div>
    )
}

export default CardRepositorio; 