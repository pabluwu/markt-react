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

import './Components/style.css';
const PerfilUsuario = () => {
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'contactos', nombre: 'Contactos' },
        { key: 'configurar', nombre: 'Configurar' },
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);
    const { username } = useParams();
    const { user } = useStore();
    const { usuario } = getUsuarioByUsername(username);

    const { postsUser } = getAllPostByUser(usuario?.id);
    // console.log(postsUser);
    return (
        <>
            <Navbar />
            {
                !usuario ?
                    <div className="d-flex justify-content-center mt-5">
                        <h1>Profile not found</h1>
                    </div>
                    :
                    <>
                        <Perfil
                            user={usuario}
                            opciones={opciones}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption} />
                        <div className="container">
                            <div className="margin-content-usuario">
                                {
                                    selectedOption.key == 'publicaciones' &&
                                    <>
                                        {
                                            user &&
                                            usuario &&
                                            user.id == usuario.id &&
                                            <Publicar author_id={user.id} type={'user'} />
                                        }
                                        <Post posts={postsUser} />
                                    </>
                                }
                                {
                                    selectedOption.key == 'configurar' &&
                                    <Configurar />
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default PerfilUsuario;