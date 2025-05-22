import React from 'react';

const NewsBox = ({ item }) => {
    const { imageSrc, fecha, medio, titulo, contenido, url_original } = item;
    function truncateText(text, maxLength = 70) {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength).trim() + "..."
            : text;
    }

    return (
        <div className="container my-3">
            <div className="row bg-light p-3 rounded">
                {/* Imagen */}
                <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center">
                    {/* <img
                        src={imageSrc}
                        alt="Noticia"
                        className="img-fluid w-100 rounded"
                        style={{ objectFit: 'cover', height: '100%' }}
                    /> */}
                </div>

                {/* Contenido */}
                <div className="col-md-8 d-flex flex-column justify-content-center">
                    <small className="text-muted">{fecha}</small>
                    <p className="mb-1"><em>{medio}</em></p>
                    <h5 className="fw-bold">{titulo}</h5>
                    <p className="text-muted">{truncateText(contenido)}</p>
                    <a className="btn btn-dark align-self-start text-white" href={url_original} target='_blank'>
                        Leer más
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsBox;
