import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables"; // Asegúrate de que 'api' sea la URL base de tu backend, por ejemplo: "https://markt.cl/api/"
import Navbar from "../../Components/Navbar/Navbar";
import NewsBox from "../PublicHome/components/NewsBox";
import NewsCard from "../PublicHome/components/NewsCard";
import { useEffect } from "react";

const Noticias = () => {

    // Define cuántas noticias quieres cargar por página.
    // Aunque tu API ya lo maneja con 'limit', puedes mantener esto para consistencia
    // o para usarlo en la URL si tu API esperara 'limit' explícitamente.
    // Dado que tu `next` URL ya incluye `limit=9`, no necesitamos pasarlo directamente en fetch.
    const NEWS_PER_PAGE = 9;

    const getNoticiasPaginated = async ({ pageParam }) => {
        // Si pageParam es la URL de la siguiente página (del campo 'next' de la respuesta anterior)
        // o si es la primera carga (undefined, en cuyo caso construimos la URL inicial)
        const url = pageParam ? pageParam : `${api}api/noticias/?limit=${NEWS_PER_PAGE}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener noticias');
        }
        const data = await response.json();
        // La respuesta de tu API es: { count, next, previous, results }
        return {
            news: data.results, // Tus noticias están en 'results'
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
        queryKey: ['noticias_infinite'],
        queryFn: getNoticiasPaginated,
        // `lastPage` es el objeto que retornó `getNoticiasPaginated` de la página anterior
        getNextPageParam: (lastPage) => lastPage.nextPageUrl, // Usamos la URL de la siguiente página
        initialPageParam: null, // No hay un pageParam inicial, la URL se construye en getNoticiasPaginated
    });

    // Aplanar los datos de todas las páginas en una sola matriz de noticias
    const allNoticias = data?.pages?.flatMap(page => page.news) || [];

    // Lógica para detectar el scroll al final de la página
    useEffect(() => {
        const handleScroll = () => {
            // Verifica si el usuario está cerca del final de la página
            const scrollThreshold = 100; // Carga nuevas noticias cuando queden 100px para el final del scroll
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold &&
                hasNextPage && // Solo si hay más páginas
                !isFetchingNextPage // Y no estamos ya cargando
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]); // Dependencias del useEffect

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <h4 className="title-text mt-4">Noticias</h4>
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

    if (isError) {
        return <p>Error al cargar las noticias: {error.message}</p>;
    }

    // Si no hay noticias, muestra un mensaje
    if (allNoticias.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <h4 className="title-text mt-4">Noticias</h4>
                    <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>
                    <p className="mt-3">No hay noticias disponibles en este momento.</p>
                </div>
            </>
        );
    }

    // La primera noticia para el componente destacado
    const featuredNews = allNoticias[0];
    // Las noticias restantes para el listado pequeño
    const smallNews = allNoticias.slice(1);

    return (
        <>
            <Navbar />
            <div className="container py-4" style={{ overflow: 'hidden' }}>
                <h4 className="title-text mt-4">Noticias</h4>
                <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-12">
                        {/* Noticia destacada (grande) */}
                        {featuredNews && (
                            <NewsBox item={featuredNews} />
                        )}

                        {/* Noticias pequeñas */}
                        <div className="row">
                            {smallNews.map((item, i) => (
                                <div key={item.id || `news-${i}`} className="col-md-4 mb-3">
                                    <NewsCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isFetchingNextPage && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>

                    </div>
                )}

                {/* Muestra un mensaje cuando no hay más páginas para cargar y ya se han mostrado noticias */}
                {!hasNextPage && allNoticias.length > 0 && (
                    <div className="text-center my-3">
                        <p>¡Has llegado al final de las noticias!</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Noticias;