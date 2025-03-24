import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMisEmpresas } from '../../services/useEmpresas';
import useStore from '../../store/userStore';
import { api } from '../../assets/variables';
import { toggleLikePost } from '../../services/usePost';

import SampleAvatar from '../../assets/SampleAvatar.png';
import useFormattedDate from '../../services/useFormattedDate';
import SelectorPerfil from '../SelectorPerfil/SelectorPerfil';

import Like from "../../assets/like.svg";
import Liked from "../../assets/liked.svg";

const PostItem = ({ item }) => {
    const created = useFormattedDate(item.created_at);
    const { misEmpresas } = useMisEmpresas();
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useStore();
    const [selected, setSelected] = useState({ id: user.id, type: 'user', nombre: user.first_name });

    // Query para verificar el estado del like
    const getLikeByLike = async () => {
        const acc = localStorage.getItem('access_token');
        // console.log('se revisa este post', { post_id: item.id, liker_id: selected.id, like_type: selected.type });
        const data = { post_id: item.id, liker_id: selected.id, like_type: selected.type };
        const response = await fetch(`${api}api/like/check_like/?post_id=${data.post_id}&liker_id=${data.liker_id}&like_type=${data.like_type}`, {
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

    // Query para obtener el like, con 'enabled' activado solo cuando 'selected' tiene un id
    const { data: liked, refetch: likedRefetch } = useQuery(
        {
            queryKey: ['likes', item.id], // La clave ahora es un objeto
            queryFn: getLikeByLike,
            enabled: !!selected.id,  // Solo se ejecuta si selected tiene un id
        }
    );

    // Use mutation para cambiar el like
    const mutation = useMutation({
        mutationFn: (data) => toggleLikePost(data),
        onSuccess: () => {
            likedRefetch(); // Refetch el like después de la mutación
        },
        onError: (error) => {
            console.log('Hubo un error al dar like', error);
        },
    });

    const handleLike = async () => {
        const data = { post_id: item.id, liker_id: selected.id, like_type: selected.type };
        // console.log('se da like a post', item.id);
        mutation.mutate(data);
    };

    // Condición para saber si el post está marcado como "like" o no
    useEffect(() => {
        // console.log('se marca como like', item.id);
        setIsLiked(liked?.liked === 1);
    }, [liked])

    // Efecto para ejecutar cuando el selected cambie y obtener el estado del like
    useEffect(() => {
        // console.log(`Liked de ${selected.nombre}: ${liked?.liked}`);
        likedRefetch();
    }, [selected]); // Esto asegura que se ejecute siempre que 'liked' o 'selected' cambien


    // console.log(isLiked, item.id);
    return (
        <div className="rounded profile-card mt-3">
            <div className="info-profile px-3 py-2">
                <img src={SampleAvatar} alt="" />
                <div className='postInfo'>
                    {
                        item.author.username &&
                        <p><strong>{item.author.username}</strong></p>
                    }
                    {
                        item.author.nombre_fantasia &&
                        <p><strong>{item.author.nombre_fantasia}</strong></p>
                    }
                    <span className='fecha'>{created}</span>
                </div>
            </div>
            <div className="postContent px-4 py-2">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
            {
                misEmpresas && misEmpresas.length > 0 &&
                <div className='selector-user px-4 py-2'>
                    <SelectorPerfil
                        misEmpresas={misEmpresas}
                        user={user}
                        setSelected={setSelected}
                        refetch={likedRefetch} />
                </div>
            }
            <div className='social-buttons px-4 py-2'>
                <div className="d-flex justify-content-around button">

                    <span className='d-flex' onClick={handleLike}>
                        <img src={isLiked ? Liked : Like} alt="" />
                        <p>Me gusta</p>
                    </span>

                    <span>Comentar</span>
                    <span>Compartir</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
