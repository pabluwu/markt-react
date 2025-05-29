import { FileText, Calendar } from 'lucide-react';

const DocumentosRecientes = () => {
    const documents = [
        { title: 'Plan Estratégico 2025', date: '28/05/2025', type: 'PDF' },
        { title: 'Informe de Investigación', date: '25/05/2025', type: 'DOC' },
        { title: 'Protocolo de Seguridad', date: '22/05/2025', type: 'PDF' },
    ];

    return (
        <div className="card p-3 rounded mt-4 border-0 shadow">
            <div className="d-flex align-items-center mb-3 gap-2">
                <FileText size={18} className="text-secondary" />
                <strong className="mb-0">Documentos Recientes</strong>
            </div>
            <ul className="list-unstyled mb-0">
                {documents.map((doc, idx) => (
                    <li key={idx} className="mb-3">
                        <div className="border-start ps-3">
                            <div className="fw-semibold">{doc.title}</div>
                            <small className="text-muted d-flex align-items-center gap-2">
                                <span className="d-flex align-items-center gap-1">
                                    <Calendar size={14} />
                                    {doc.date}
                                </span>
                                <span className="badge bg-light text-dark text-uppercase">{doc.type}</span>
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DocumentosRecientes;