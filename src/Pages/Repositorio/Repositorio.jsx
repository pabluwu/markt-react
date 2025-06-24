import { useEffect, useRef, useCallback } from 'react';
import { useRecursosInfinite } from "../../services/useRecursos";

import Navbar from "../../Components/Navbar/Navbar";
import CardDocumento from "../PublicHome/components/CardDocumento";

const Repositorio = () => {

    const {
        recursos,
        fetchNextRecursos,
        hasMoreRecursos,
        isFetchingNextRecursos,
        isLoadingRecursos,
        isErrorRecursos,
        errorRecursos,
        refetchAllRecursos
    } = useRecursosInfinite();

    // Referencia para el elemento que activará la carga de más datos
    const observerRef = useRef();
    const lastElementRef = useCallback(node => {
        if (isFetchingNextRecursos) return;
        
        if (observerRef.current) observerRef.current.disconnect();
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMoreRecursos) {
                fetchNextRecursos();
            }
        });
        
        if (node) observerRef.current.observe(node);
    }, [isFetchingNextRecursos, hasMoreRecursos, fetchNextRecursos]);

    console.log(recursos);

    if (isLoadingRecursos) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <h4 className="mt-4 title-text">Documentos</h4>
                    <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (isErrorRecursos) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <h4 className="mt-4 title-text">Documentos</h4>
                    <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>
                    <p className="text-center mt-3">Error al cargar los documentos: {errorRecursos.message}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-4" style={{ overflow: 'hidden' }}>
                <h4 className="mt-4 title-text">Documentos</h4>
                <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            {recursos && recursos.length > 0 ? (
                                recursos.map((item, i) => (
                                    <div 
                                        key={item.id || `recurso-${i}`} 
                                        className="col-md-4 mb-3"
                                        ref={i === recursos.length - 1 ? lastElementRef : null}
                                    >
                                        <CardDocumento documento={item} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center mt-3">No hay documentos disponibles.</p>
                            )}
                        </div>
                    </div>
                </div>

                {isFetchingNextRecursos && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando más documentos...</span>
                        </div>
                        <p className="mt-2">Cargando más documentos...</p>
                    </div>
                )}

                {!hasMoreRecursos && recursos.length > 0 && (
                    <div className="text-center my-3">
                        <p>¡Has llegado al final de los documentos!</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Repositorio;