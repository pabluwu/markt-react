import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMisEmpresas } from '../../services/useEmpresas';
import useStore from '../../store/userStore';
import { api, media_url } from '../../assets/variables';
import { toggleLikePost } from '../../services/usePost';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

import SampleAvatar from '../../assets/SampleAvatar.png';
import useFormattedDate from '../../services/useFormattedDate';
import SelectorPerfil from '../SelectorPerfil/SelectorPerfil';
import Comentario from '../Comentario/Comentario';

import Like from "../../assets/like.svg";
import Liked from "../../assets/liked.svg";

const PostItem = ({ item }) => {
    const created = useFormattedDate(item.created_at);
    const { misEmpresas } = useMisEmpresas();
    const [isLiked, setIsLiked] = useState(false);
    const [comentar, setComentar] = useState(false);
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


    // console.log(item);
    return (
        <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
                {/* Header */}
                <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-3" style={{ width: 40, height: 40 }}>
                        {item.author?.userprofile?.imagen_perfil || item.author?.imagen_perfil ? (
                            <img
                                src={`${media_url}/${item.author.userprofile?.imagen_perfil || item.author.imagen_perfil}`}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <span className="text-muted fw-bold">
                                {item.author?.username?.[0]?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="fw-semibold text-dark small mb-1">
                            {item.author?.username ? (
                                <a href={`/p/${item.author.username}`} className="text-decoration-none text-dark">
                                    {item.author.username}
                                </a>
                            ) : (
                                <Link to={`/c/${item.author.id}`} className="text-decoration-none text-dark">
                                    {item.author.nombre_fantasia}
                                </Link>
                            )}
                        </div>
                        <div className="text-muted small">{created}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} className="text-body" />
                </div>

                {/* Tags (si hay) */}
                {item.tags && item.tags.length > 0 && (
                    <div className="mb-3">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="badge bg-light text-muted me-2">{tag}</span>
                        ))}
                    </div>
                )}

                {/* Selector de perfil */}
                {misEmpresas && misEmpresas.length > 0 && (
                    <div className="mb-3">
                        <SelectorPerfil
                            misEmpresas={misEmpresas}
                            user={user}
                            setSelected={setSelected}
                            refetch={likedRefetch}
                        />
                    </div>
                )}

                {/* Social buttons */}
                <div className="border-top pt-2 d-flex justify-content-start gap-5 text-muted small">
                    <button className="btn btn-link d-flex align-items-center gap-1 text-decoration-none text-muted p-0" onClick={handleLike}>
                        {isLiked ? <ThumbsUp fill="currentColor" strokeWidth={1.5} size={16} /> : <ThumbsUp strokeWidth={1.5} size={16} />}
                        <span>Me gusta</span>
                    </button>
                    <button className="btn btn-link d-flex align-items-center gap-1 text-decoration-none text-muted p-0" onClick={() => setComentar(!comentar)}>
                        <MessageCircle strokeWidth={1.5} size={16} />
                        <span>Comentar</span>
                    </button>
                    {/* <button className="btn btn-link d-flex align-items-center gap-1 text-decoration-none text-muted p-0">
                        <Share2 strokeWidth={1.5} />
                        <span>Compartir</span>
                    </button> */}
                </div>

                {comentar && (
                    <div className="mt-2">
                        <Comentario post_id={item.id} commenter_id={selected.id} commenter_type={selected.type} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostItem;
