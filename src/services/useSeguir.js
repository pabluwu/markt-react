import { api } from "../assets/variables";

export const toggleSeguir = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/seguir/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Error al seguir');
    }
    return response.json();
};


export const verSeguidores = async (id, type) => {
    // console.log('id', id, 'type', type);
    const acc = localStorage.getItem('access_token');
    const response = await fetch(`${api}api/seguir/seguidores/?type_seguido=${type}&id_seguido=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
    })
    if (!response.ok) {
        throw new Error('Error al obtener información del seguidor');
    }
    return response.json();
};
