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
        refetch: refetchAllPosts
    } = useQuery({ queryKey: ['posts'], queryFn: get });

    // console.log(posts);

    return {
        posts,
        refetchAllPosts
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
        refetch: refetchPosts
    } = useQuery({ queryKey: ['posts', idEmpresa], queryFn: get });

    return {
        postsEmpresa,
        refetchPosts
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
        refetch: refetchAllPostByUser,
    } = useQuery({ queryKey: ['posts', idUser], queryFn: get });

    return {
        postsUser,
        refetchAllPostByUser
    }
}

export const toggleLikePost = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/like/toggle_like/`, {
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

export const getLikeByLike = async (data) => {
    const acc = localStorage.getItem('access_token');

    const response = await fetch(`${api}api/like/check_liker?post_id=1&liker_id=1&like_type=empresa`, {
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