import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useAuth } from '../../../services/AuthContext';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useFormattedDate from '../../../services/useFormattedDate';
import FadeOverlay from '../../PublicHome/components/FadeOverlay';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PdfPreview = ({ fileUrl, obj }) => {
    const { isAuthenticated } = useAuth();
    const maxPagesToShow = isAuthenticated ? null : 1;

    const [numPages, setNumPages] = useState(null);

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex flex-column bg-light p-3 rounded shadow">
                            <p className="text-muted">Vista previa del documento PDF.</p>
                            <p className="text-muted">Para ver el documento completo, inicia sesión.</p>
                            <p className=''><strong>Título:</strong> {obj.titulo}</p>
                            <p className=''><strong>Descripción:</strong> {obj.descripcion}</p>
                            <p className=""><strong>Número de páginas:</strong> {numPages || 'Cargando...'}</p>
                            <p className=""><strong>Fecha publicación:</strong> {useFormattedDate(obj.fecha_subida) || 'Sin Fecha'}</p>
                        </div>
                    </div>
                    <div className="col-lg-8 bg-white rounded shadow">
                        <div className='d-flex justify-content-center align-items-center mb-3'>
                            <Document file={fileUrl} onLoadSuccess={onLoadSuccess}>
                                {Array.from(
                                    new Array(maxPagesToShow || numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            width={600}
                                        />
                                    )
                                )}
                            </Document>
                        </div>
                    </div>
                </div>
            </div>

            {!isAuthenticated && (
                <FadeOverlay />
            )}
        </div>
    );
};

export default PdfPreview;
