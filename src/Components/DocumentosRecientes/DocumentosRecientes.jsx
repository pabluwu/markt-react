import { FileText, Calendar } from 'lucide-react';

const DocumentosRecientes = ({ documents }) => {
    return (
        <>
            {
                documents.length > 0 &&
                <div className="card p-3 rounded mt-4 border-0 shadow">
                    <div className="d-flex align-items-center mb-3 gap-2">
                        <FileText className="text-secondary" />
                        <strong className="mb-0">Documentos Recientes</strong>
                    </div>
                    <ul className="list-unstyled mb-0">
                        {documents.map((doc, idx) => (
                            <li key={idx} className="mb-3">
                                <div className="border-start ps-3">
                                    <div className="fw-semibold">{doc.titulo}</div>
                                    <small className="text-muted d-flex align-items-center gap-2">
                                        <span className="d-flex align-items-center gap-1">
                                            <Calendar size={14} />
                                            {doc.date}
                                        </span>
                                        <span className="badge bg-light text-dark text-uppercase">{doc.rubro}</span>
                                    </small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
}

export default DocumentosRecientes;