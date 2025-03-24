import { useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/useEmpresas";
import { getAllPostByEmpresa } from "../../services/usePost";

import Navbar from "../../Components/Navbar/Navbar";
import CardReputacion from "./Components/CardReputacion";
import Tab from "../../Components/Tab/Tab";
import Post from "../../Components/Post/Post";

import SampleAvatar from '../../assets/SampleAvatar.png';
import './style.css';
const PerfilEmpresa = () => {
    const opciones = [
        { key: 'publicaciones', nombre: 'Publicaciones' },
        { key: 'servicios', nombre: 'Servicios' }
    ]
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
                                    <span className="boton-seguir btn-azul text-center">
                                        Seguir
                                    </span>
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