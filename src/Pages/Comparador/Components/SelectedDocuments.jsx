import { FileText, X } from 'lucide-react';

const SelectedDocuments = ({ documents, onRemove }) => {
    return (
        <div className='mb-3'>
            <div className="border rounded p-4 bg-white">
                <h6 className="fw-bold mb-3">
                    Documentos Seleccionados ({documents.length})
                </h6>

                <div className="d-flex flex-wrap gap-2">
                    {documents.map((doc, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center bg-light px-3 py-1 rounded-pill"
                        >
                            <FileText size={16} className="me-2" />
                            <span className="text-truncate" style={{ maxWidth: 200 }}>
                                {doc.titulo}
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm btn-link text-dark ms-2 p-0"
                                onClick={() => onRemove(doc.id)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectedDocuments;
