// components/NewsCard.js
import React from 'react';

const NewsCard = ({ item }) => {
    const { imageSrc, fecha, medio, titulo, contenido, url_original } = item;
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
                <small className="text-muted">{item.fecha || "Sin fecha"}</small>
                <h6 className="card-title mt-1">{item.titulo}</h6>
                <p className="card-text">
                    {truncateText(item.contenido, 50)}
                </p>
                <div className="mt-auto">
                    <a
                        // href={item.url_original}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm text-white"
                    >
                        Leer más
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
