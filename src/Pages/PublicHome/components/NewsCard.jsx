// components/NewsCard.js
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Calendar } from 'lucide-react';

const NewsCard = ({ item }) => {
    const { imageSrc, fecha, medio, titulo, contenido, url_original } = item;
    function truncateText(text, maxLength = 70) {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength).trim() + "..."
            : text;
    }
    return (
        <div className="bg-white rounded shadow px-3 py-3 h-100 d-flex flex-column hover-shadow">
            {/* <img
                src={item.imageSrc || "https://via.placeholder.com/600x400"}
                className="card-img-top"
                alt={item.medio}
            /> */}
            <a href={item.url_original} className='h-100'>
                <div className="card-body d-flex flex-column gap-2 h-100">
                    <small className="text-muted d-flex align-items-center gap-1">
                        <Calendar style={{width: '16px'}} />
                        {item.fecha || "Sin fecha"}
                    </small>
                    <h6 className="card-title mt-1 fs-5 fw-bold">{item.titulo}</h6>
                    <p className="card-text fs-6 fw-light text-muted">
                        {truncateText(item.contenido, 50)}
                    </p>
                    <div className='mt-auto d-flex justify-content-between align-items-center'>
                        <span className="text-dark">Leer más</span>
                        <ArrowUpRight />
                    </div>
                </div>
            </a>
        </div>
    );
};

export default NewsCard;
