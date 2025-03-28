import { useQuery } from "@tanstack/react-query";
import { api } from "../assets/variables";
import { convertToFormData } from "./convertFormData";

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
    console.log('vamos a buscar el usuario', username);
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
    } = useQuery({ queryKey: ['usuarioUsername', username], queryFn: get });

    return {
        usuario,
    }
}

export const updateUsuario = async (data) => {
    const acc = localStorage.getItem("access_token");
    const formData = convertToFormData(data)
    const res = await fetch(`${api}api/usuario/${data.idUser}/update-user/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        method: 'PUT',
        body: formData
    });

    if (!res.ok) {
        throw new Error('Failed to update');
    }
    return res.json();

}



