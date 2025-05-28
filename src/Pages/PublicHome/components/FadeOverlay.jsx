// components/FadeOverlay.js
import React from 'react';

const FadeOverlay = () => {
    return (
        <div className="position-relative w-100 mt-3"
            style={{ height: '100px', bottom: 0 }}>
            <div
                className="position-relative start-0 w-100 h-100 d-flex align-items-end justify-content-center"
                style={{
                    background: 'linear-gradient(to top, #c1daff, rgba(245, 220, 230, 0))',
                    pointerEvents: 'none',
                }}
            >
                <div
                    className="text-center mb-4"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        pointerEvents: 'auto',
                    }}
                >
                    <p className="mb-1">Para ver más, inicia sesión</p>
                    <a href="/login" className="btn btn-sm btn-primary text-white">Iniciar sesión</a>
                </div>
            </div>
        </div>
    );
};

export default FadeOverlay;
