import { renderFormattedDate } from "../../../services/useFormattedDate";

const CardDocumento = ({ documento }) => {
    function truncateText(text, maxLength = 70) {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength).trim() + "..."
            : text;
    }
    return (
        <div className="card h-100 d-flex flex-column">
            {/* <img
                src={item.imageSrc || "https://via.placeholder.com/600x400"}
                className="card-img-top"
                alt={item.medio}
            /> */}
            <div className="card-body d-flex flex-column">
                <small className="text-muted">{renderFormattedDate(documento.fecha_subida) || "Sin fecha"}</small>
                <h6 className="card-title mt-1">Título: {documento.titulo}</h6>
                <p className="card-text">
                    Descripción: {truncateText(documento.descripcion, 50)}
                </p>
                <div className="mt-auto d-flex gap-2">
                    <a
                        href={documento.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm text-white"
                    >
                        Fuente
                    </a>
                    <a
                        href={`repositorio/doc/${documento.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm text-white"
                    >
                        Abrir documento
                    </a>
                </div>

            </div>
        </div>
    )
}

export default CardDocumento;