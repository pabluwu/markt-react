import { useQuery } from "@tanstack/react-query";
import { api } from "../assets/variables";


export const useIdEmailUsuarios = () => {
    const acc = localStorage.getItem("access_token");
    const get = async () => {
        const res = await fetch(`${api}api/usuario/id_email_all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return res.json();
    }

    const {
        data: usuarios,
    } = useQuery({ queryKey: ['usuariosIdEmail'], queryFn: get });

    return {
        usuarios,
    }
}

export const getUsuarioByUsername = (username) => {
    const acc = localStorage.getItem("access_token");
    const get = async () => {
        const res = await fetch(`${api}api/usuario/by-username/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return res.json();
    }

    const {
        data: usuario,
    } = useQuery({ queryKey: ['usuarioUsername'], queryFn: get });

    return {
        usuario,
    }
}

export const updateUsuario = async (data) => {
    const acc = localStorage.getItem("access_token");

    const res = await fetch(`${api}api/usuario/${data.idUser}/update-user/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        method: 'PUT',
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Failed to update');
    }
    return res.json();

}



