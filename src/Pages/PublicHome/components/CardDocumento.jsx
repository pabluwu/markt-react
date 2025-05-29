import { renderFormattedDate } from "../../../services/useFormattedDate";
import {
    FileText,
    Calendar,
    Download,
    ExternalLink,
    ArrowUpRight
} from 'lucide-react';

const CardDocumento = ({ documento }) => {
    function truncateText(text, maxLength = 70) {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength).trim() + "..."
            : text;
    }
    return (
        // <div className="card h-100 d-flex flex-column">
        //     {/* <img
        //         src={item.imageSrc || "https://via.placeholder.com/600x400"}
        //         className="card-img-top"
        //         alt={item.medio}
        //     /> */}
        //     <div className="card-body d-flex flex-column">
        //         <small className="text-muted">{renderFormattedDate(documento.fecha_subida) || "Sin fecha"}</small>
        //         <h6 className="card-title mt-1">Título: {documento.titulo}</h6>
        //         <p className="card-text">
        //             Descripción: {truncateText(documento.descripcion, 50)}
        //         </p>
        //         <div className="mt-auto d-flex gap-2">
        //             <a
        //                 href={documento.link}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="btn btn-dark btn-sm text-white"
        //             >
        //                 Fuente
        //             </a>
        //             <a
        //                 href={`repositorio/doc/${documento.id}`}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="btn btn-dark btn-sm text-white"
        //             >
        //                 Abrir documento
        //             </a>
        //         </div>

        //     </div>
        // </div>
        <div className="card p-3 border-0 shadow-sm rounded-4 mt-4" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-start gap-3">
                <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-center">
                    <FileText size={24} className="text-secondary" />
                </div>
                <div className="flex-grow-1">
                    <small className="text-muted">DOC</small>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        <h6 className="mb-1 fw-semibold">{documento.titulo}</h6>
                        <small className="text-muted d-flex align-items-center gap-1">
                            <Calendar size={14} />
                            {renderFormattedDate(documento.fecha_subida) || "Sin fecha"}
                        </small>
                    </div>
                    <p className="text-muted small mb-3">
                        {truncateText(documento.descripcion, 50)}
                    </p>
                    <div className="d-flex gap-2">
                        {/* <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                            <Download size={16} />
                            Descargar
                        </button> */}
                        <a
                            className="btn btn-dark btn-sm d-flex align-items-center gap-1 text-white" 
                            href={`repositorio/doc/${documento.id}`}
                            target="_blank">
                            <ExternalLink size={16} />
                            Ver documento
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CardDocumento;