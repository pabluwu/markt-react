import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useAuth } from '../../../services/AuthContext';
import { CalendarDays, Hash } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useFormattedDate from '../../../services/useFormattedDate';
import FadeOverlay from '../../PublicHome/components/FadeOverlay';
import LoginPrompt from '../../../Components/LoginPrompt/LoginPrompt';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PdfPreview = ({ fileUrl, obj }) => {
  const { isAuthenticated } = useAuth();
  const maxPagesToShow = isAuthenticated ? null : 1;
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const tagsArray = obj.palabrasClaves
    .split(",")           // divide por coma
    .map(tag => tag.trim()) // elimina espacios alrededor
    .filter(tag => tag);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Lado izquierdo */}
        <div className="col-lg-4">
          <div className="bg-white border rounded shadow-sm p-3 mb-3">
            {
              tagsArray.length > 0 &&
              tagsArray.map((tag, index) => (
                <span className="badge bg-light text-dark mb-2 fw-semibold">{tag}</span>
              ))
            }
            <h5 className="fw-bold">{obj.titulo}</h5>
            <p className="text-muted">{obj.descripcion}</p>
          </div>

          <div className="bg-white border rounded shadow-sm p-3">
            <h6 className="fw-semibold mb-3">Información del documento</h6>
            <div className="d-flex align-items-center mb-2 text-muted">
              <Hash size={18} className="me-2" />
              <span><strong>Número de páginas:</strong>&nbsp;{numPages || 'Cargando...'}</span>
            </div>
            <div className="d-flex align-items-center mb-2 text-muted">
              <CalendarDays size={18} className="me-2" />
              <span><strong>Fecha de publicación:</strong>&nbsp;{useFormattedDate(obj.fecha_subida) || 'Sin Fecha'}</span>
            </div>
          </div>
          {!isAuthenticated && <LoginPrompt />}
        </div>

        {/* Contenedor PDF */}
        <div className="col-lg-8">
          <div className="bg-white border rounded shadow-sm p-3 d-flex justify-content-center">
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
  );
};

export default PdfPreview;
