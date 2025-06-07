// Components/Noticias/Noticias.jsx
import { useEffect } from "react"; // Necesitamos useEffect para la detección de scroll
import { useInfiniteQuery } from "@tanstack/react-query"; // Importa useInfiniteQuery

import NoticiaItem from "./NoticiaItem";

import { api } from "../../assets/variables";

const Noticias = () => {
    const getPaginatedNoticias = async ({ pageParam }) => {
        const acc = localStorage.getItem('access_token');
        // Si pageParam es la URL de la siguiente página (del campo 'next' de la respuesta anterior)
        // o si es la primera carga (undefined, en cuyo caso usamos la URL base)
        const url = pageParam ? pageParam : `${api}api/noticias/`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener noticias');
        }
        const data = await response.json();
        // La respuesta de tu API es: { count, next, previous, results }
        return {
            news: data.results,     // Tus noticias están en 'results'
            nextPageUrl: data.next, // La URL de la siguiente página está en 'next'
        };
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['infinite_noticias'], // Una clave única para esta consulta infinita
        queryFn: getPaginatedNoticias,
        getNextPageParam: (lastPage) => lastPage.nextPageUrl, // Usamos la URL de la siguiente página
        initialPageParam: null, // No hay un pageParam inicial, la URL se construye en getPaginatedNoticias
    });

    // Aplanar los datos de todas las páginas en una sola matriz de noticias
    const allNoticias = data?.pages?.flatMap(page => page.news) || [];

    // Lógica para detectar el scroll al final de la página
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100; // Carga nuevas noticias cuando queden 100px para el final
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]); // Dependencias del useEffect

    if (isLoading) {
        return <p>Cargando noticias...</p>;
    }

    if (isError) {
        return <p>Error al cargar las noticias: {error.message}</p>;
    }

    return (
        <>
            {
                allNoticias.length > 0 ? (
                    allNoticias.map((item, index) => (
                        <NoticiaItem noticia={item} key={item.id || index} />
                    ))
                ) : (
                    <p className="text-center mt-3">No hay noticias disponibles en este momento.</p>
                )
            }

            {isFetchingNextPage && (
                <div className="text-center my-3">
                    <p>Cargando más noticias...</p>
                    {/* Puedes añadir un spinner de carga aquí si lo deseas */}
                </div>
            )}

            {!hasNextPage && allNoticias.length > 0 && (
                <div className="text-center my-3">
                    <p>¡Has llegado al final de las noticias!</p>
                </div>
            )}
        </>
    );
};

export default Noticias;