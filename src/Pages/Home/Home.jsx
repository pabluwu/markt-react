// Home.jsx
import { useState, useEffect } from 'react'; // Importa useEffect
import useStore from '../../store/userStore';
import { usePostsInfinite } from '../../services/usePost'; // Importa la nueva función
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import Publicar from '../../Components/Publicar/Publicar';
import MisEmpresas from '../../Components/MisEmpresas/MisEmpresas';
import Post from '../../Components/Post/Post';
import Noticias from '../../Components/Noticias/Noticias';
import Tab from '../../Components/Tab/Tab';
import CardRepositorio from '../../Components/Repositorio/CardRepositorio';

const Home = () => {
    const [selectedOption, setSelectedOption] = useState({ key: 'posts', nombre: 'Publicaciones', estado: 1 });
    const { user } = useStore();

    // Cambia la llamada a la nueva función de posts infinitos
    const {
        posts, // Ahora 'posts' contiene todos los posts cargados hasta el momento
        fetchNextPosts,
        hasMorePosts,
        isFetchingNextPosts,
        isLoadingPosts,
        isErrorPosts,
        errorPosts,
        refetchAllPosts
    } = usePostsInfinite();

    const opciones = [
        { key: 'posts', nombre: 'Publicaciones', estado: 1 },
        { key: 'news', nombre: 'Noticias', estado: 0 }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (selectedOption.key === 'posts') {
                const scrollThreshold = 100;
                if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold &&
                    hasMorePosts &&
                    !isFetchingNextPosts
                ) {
                    fetchNextPosts();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selectedOption.key, hasMorePosts, isFetchingNextPosts, fetchNextPosts]); // Dependencias del useEffect


    if (isErrorPosts) {
        return <p>Error al cargar las publicaciones: {errorPosts.message}</p>;
    }

    return (
        <>
            {
                user &&
                <>
                    <Navbar />
                    <div className="container mt-4">
                        <div className="row ">
                            <div className="col-lg-3 mb-2">
                                <ProfileCard user={user} />
                            </div>
                            <div className="col-lg-6 mb-2">
                                <Publicar author_id={user.id} type={'user'} refetchPosts={refetchAllPosts} author={user} />

                                <Tab
                                    opciones={opciones}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption} />
                                {
                                    selectedOption.key === 'posts' && (
                                        <>
                                            {/* Pasa los posts aplanados al componente Post */}
                                            {posts && posts.length > 0 ? (
                                                <Post posts={posts} />
                                            ) : (
                                                <p className="text-center mt-3">No hay publicaciones disponibles.</p>
                                            )}

                                            {/* Indicador de carga para más posts */}
                                            {isFetchingNextPosts && (
                                                <div className="text-center my-3">
                                                    <p>Cargando más publicaciones...</p>
                                                    {/* Puedes añadir un spinner de carga aquí */}
                                                </div>
                                            )}

                                            {/* Mensaje cuando no hay más posts */}
                                            {!hasMorePosts && posts.length > 0 && (
                                                <div className="text-center my-3">
                                                    <p>¡Has llegado al final de las publicaciones!</p>
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                                {
                                    // La sección de noticias ya debería manejar su propio lazy loading
                                    selectedOption.key === 'news' && <Noticias />
                                }
                            </div>
                            <div className="col-lg-3 mb-2">
                                <MisEmpresas />
                                <CardRepositorio />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home;