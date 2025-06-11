import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsuarioByUsername } from "../../services/useUsuarios";
import { getAllPostByUser } from "../../services/usePost";
import useStore from "../../store/userStore";

import Navbar from "../../Components/Navbar/Navbar";
import Perfil from "./Components/Perfil";
import Post from "../../Components/Post/Post";
import Publicar from "../../Components/Publicar/Publicar";
import Configurar from "./Components/Configurar";
import Contactos from "./Components/Contactos";
import Loader from "../../Components/Loader/Loader";
import Tab from "../../Components/Tab/Tab";

import { MessageCircle, Users, Settings } from "lucide-react";

import './Components/style.css';
const PerfilUsuario = () => {
    const { user } = useStore();
    const { username } = useParams();
    const { usuario, isLoading, isError } = getUsuarioByUsername(username);
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones', icon: <MessageCircle size={16} /> },
        { key: 'contactos', nombre: 'Contactos', icon: <Users size={16} /> },
        { key: 'configurar', nombre: 'Configurar', icon: <Settings size={16} />, show: usuario?.id == user?.id ? false : true},
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);

    console.log(opciones);
    console.log(usuario?.id, user?.id);

    const {
        postsUser,
        fetchNextPosts,
        hasMorePosts,
        isFetchingNextPosts,
        refetchAllPostByUser
    } = getAllPostByUser(usuario?.id);

    useEffect(() => {
        const handleScroll = () => {
            if (selectedOption.key === 'publicaciones') {
                const scrollThreshold = 100;
                const scrollY = window.scrollY || window.pageYOffset;
                const viewportHeight = window.innerHeight;
                const fullHeight = document.documentElement.scrollHeight;

                if (viewportHeight + scrollY >= fullHeight - scrollThreshold &&
                    hasMorePosts &&
                    !isFetchingNextPosts
                ) {
                    fetchNextPosts();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selectedOption.key, hasMorePosts, isFetchingNextPosts, fetchNextPosts]);

    useEffect(() => {
        setSelectedOption(opciones[0]);
    }, [username])
    return (
        <>
            <Navbar />
            {
                isLoading &&
                <Loader />
            }
            {
                usuario &&
                <div className="container">

                    <div className="row">
                        <div className="col-md-3">
                            <Perfil
                                user={usuario}
                                opciones={opciones}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption} />
                        </div>
                        <div className="col-md-9">

                            <div className="container">
                                <Tab
                                    opciones={opciones}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption} />
                                <div className="mt-3">
                                    {
                                        selectedOption.key == 'publicaciones' &&
                                        <>
                                            {
                                                user &&
                                                usuario &&
                                                user.id == usuario.id &&
                                                <Publicar author_id={user.id} type={'user'} author={user} refetchPosts={refetchAllPostByUser} />
                                            }
                                            <>
                                                <Post posts={postsUser} />
                                                {isFetchingNextPosts && <Loader />}
                                                {!hasMorePosts && postsUser.length > 0 && (
                                                    <p className="text-center text-muted mt-3">No hay más publicaciones.</p>
                                                )}
                                            </>

                                        </>
                                    }
                                    {
                                        selectedOption.key == 'configurar' &&
                                        <Configurar />
                                    }
                                    {
                                        selectedOption.key == 'contactos' &&
                                        <Contactos id_user={usuario?.id} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isError &&
                <div className="d-flex justify-content-center mt-5">
                    <h1>Profile not found</h1>
                </div>
            }
        </>
    )
}

export default PerfilUsuario;