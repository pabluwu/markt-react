import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import { Link } from "react-router-dom";

import "./style.css";

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

    // console.log(seguidos);
    return (
        <div className="mt-4">
            <div className="">
                <div className="row">
                    {
                        seguidos &&
                        seguidos.length > 0 &&
                        seguidos.map((item, index) => (
                            <div
                                className="col-lg-3"
                                key={index}>
                                <div className="card-seguido rounded p-4 border-box-shadow">
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