import { useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/useEmpresas";
import { getAllPostByEmpresa } from "../../services/usePost";

import SeguirButton from "../../Components/SeguirButton/SeguirButton";
import Navbar from "../../Components/Navbar/Navbar";
import CardReputacion from "./Components/CardReputacion";
import Tab from "../../Components/Tab/Tab";
import Post from "../../Components/Post/Post";
import useStore from "../../store/userStore";

import SampleAvatar from '../../assets/SampleAvatar.png';
import './style.css';
const PerfilEmpresa = () => {
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'servicios', nombre: 'Servicios' }
    ]
    const { user } = useStore();
    const [selectedOption, setSelectedOption] = useState(opciones[0]);
    const { id } = useParams();
    const { postsEmpresa } = getAllPostByEmpresa(id);
    const { empresa, empresaIsLoading, error } = getEmpresa(id);
    console.log(error);
    return (
        <>
            <Navbar />
            {
                !empresa ?
                    <div className="d-flex justify-content-center mt-5">
                        <h1>Not found empresa</h1>
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-lg-3">
                                <div className="contenedorPerfilEmpresa">
                                    <div className="cardEmpresa">
                                        <div className="text-center">
                                            <img src={SampleAvatar} alt="" />
                                            {
                                                empresa &&
                                                <h2>{empresa.nombre_fantasia}</h2>
                                            }
                                        </div>
                                    </div>
                                    {
                                        user &&
                                        id &&
                                        <SeguirButton
                                            id_seguido={id}
                                            type_seguido={'empresa'}
                                            id_seguidor={user.id}
                                            type_seguidor={'user'} />
                                    }
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <CardReputacion />
                                <Tab
                                    opciones={opciones}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption} />

                                {
                                    selectedOption.key == 'publicaciones' &&
                                    postsEmpresa &&
                                    <Post posts={postsEmpresa} />
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default PerfilEmpresa;