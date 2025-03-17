import { api } from "../assets/variables";
import { useQuery } from "@tanstack/react-query";

export const createPost = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
};

export const getAllPost = () => {
    const acc = localStorage.getItem("access_token");

    const get = async () => {
        const response = await fetch(`${api}api/post/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener todos los posts');
        }
        return response.json();
    }

    const {
        data: posts,
    } = useQuery({ queryKey: ['posts'], queryFn: get });

    console.log(posts);

    return {
        posts,
    }
}

export const getAllPostByEmpresa = (idEmpresa) => {
    const acc = localStorage.getItem('access_token');

    const get = async () => {
        const response = await fetch(`${api}api/post/${idEmpresa}/empresa`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener todos los posts');
        }
        return response.json();
    }

    const {
        data: postsEmpresa,
    } = useQuery({ queryKey: ['posts'], queryFn: get });

    return {
        postsEmpresa,
    }
}

export const getAllPostByUser = (idUser) => {
    const acc = localStorage.getItem('access_token');

    const get = async () => {
        const response = await fetch(`${api}api/post/${idUser}/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener todos los posts');
        }
        return response.json();
    }

    const {
        data: postsUser,
    } = useQuery({ queryKey: ['posts'], queryFn: get });

    return {
        postsUser,
    }
}