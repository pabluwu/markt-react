import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, media_url } from "../../assets/variables";
import { Link } from "react-router-dom";

import "./style.css";
import SampleAvatar from '../../assets/SampleAvatar.png';

const Seguidos = ({ id_user }) => {
    const verSeguidos = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/seguir/seguidos/?&id_seguidor=${id_user}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener información del like');
        }
        return response.json();
    };
    const { data: seguidos, refetch: seguidosRefetch } = useQuery(
        {
            queryKey: ['seguidos', id_user],
            queryFn: verSeguidos,
            // enabled: !!!id_user,
        }
    );

    console.log(seguidos);
    return (
        <div className="mt-4">
            <div className="">
                <div className="row">
                    {
                        seguidos &&
                        seguidos.length > 0 &&
                        seguidos.map((item, index) => (
                            <div className="col-lg-3 d-flex">
                                <div className="card-seguido rounded px-3 py-1 border-box-shadow d-flex flex-row gap-2 justify-content-between align-items-center w-100">
                                    <img className="rounded" src={
                                        item.userprofile?.imagen_perfil ?
                                            `${media_url}${user.userprofile.imagen_perfil}`
                                            :
                                            item.imagen_perfil ?
                                                `${media_url}${item.imagen_perfil}`
                                                :
                                                SampleAvatar
                                    } alt="" />
                                    {
                                        item.type == 'user' ?
                                            <Link to={`/p/${item.username}`}>
                                                <p><strong>{item.name}</strong></p>
                                            </Link>
                                            :
                                            <Link to={`/c/${item.id}`}>
                                                <p><strong>{item.name}</strong></p>
                                            </Link>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Seguidos;