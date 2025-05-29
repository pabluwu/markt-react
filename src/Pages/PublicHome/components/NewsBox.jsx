import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const NewsBox = ({ item }) => {
    const { imageSrc, fecha, medio, titulo, contenido, url_original } = item;
    function truncateText(text, maxLength = 500) {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength).trim() + "..."
            : text;
    }

    return (
        <div className="container my-4 shadow rounded bg-white hover-shadow" style={{transitionProperty: 'all'}}>
            <a href={url_original} target='_blank' className="text-decoration-none text-dark ">
                <div className="row p-3 rounded">
                    {/* Imagen */}
                    {/* <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center"></div> */}
                    {/* <img
                        src={imageSrc}
                        alt="Noticia"
                        className="img-fluid w-100 rounded"
                        style={{ objectFit: 'cover', height: '100%' }}
                    /> */}


                    {/* Contenido */}
                    <div className="col-md-12 d-flex gap-3 flex-column justify-content-center">
                        <small className="text-muted">{fecha}</small>
                        <p className="mb-1 text-muted">{medio}</p>
                        <h5 className="fs-3 fw-bold">{titulo}</h5>
                        <p className="text-muted fw-light">{truncateText(contenido)}</p>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className="text-dark">Leer más</span>
                            <ArrowUpRight />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default NewsBox;
