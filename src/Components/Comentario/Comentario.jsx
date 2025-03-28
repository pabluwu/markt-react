import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import Input from '../Input/Input';
import { renderFormattedDate } from '../../services/useFormattedDate';
import { api } from '../../assets/variables';
import './style.css';
const Comentario = ({ post_id, commenter_id, commenter_type }) => {
    const { formState: { errors }, setValue, getValues, trigger, register, reset } = useForm();

    useEffect(() => {
        setValue('post_id', post_id);
        setValue('commenter_id', commenter_id);
        setValue('commenter_type', commenter_type);
    }, [commenter_id,commenter_type])


    const obtenerComentarios = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/comments/?post_id=${post_id}`, {
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

    const { data: comentarios, refetch: refetchComentarios } = useQuery(
        {
            queryKey: ['comentarios', post_id], // La clave ahora es un objeto
            queryFn: obtenerComentarios,
            enabled: !!post_id,  // Solo se ejecuta si selected tiene un id
        }
    );

    console.log(comentarios);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al comentar el post');
            }
            return response.json();
        },
        onSuccess: () => {
            refetchComentarios();
            setValue('content', '');
        },
        onError: (error) => {
            console.log('Hubo un error al comentar el post', error);
        },
    });

    const enviarComentario = () => {
        const isValid = trigger('comentario');
        if (isValid) {
            // console.log(getValues());
            mutation.mutate(getValues());
        }
    }
    return (
        <>
            <div className='px-4 d-flex flex-column'>
                {
                    comentarios && comentarios.map((comentario, index) => (

                        index <= 2 &&
                        (
                            <div className="comentario__anterior">
                                <div className='datos py-1'>
                                    <p><strong>{comentario.commenter_name}</strong></p>
                                    <p className='fecha'>
                                        {renderFormattedDate(comentario?.created_at)}
                                    </p>
                                </div>

                                {comentario.content}

                            </div>
                        )
                    )
                    )}
            </div>

            <div className='px-4 comentario'>
                <div className='w-100'>
                    <input
                        type="text"
                        className='input__comentario'
                        {...register('content', { required: true })} />
                </div>
                <span
                    className='enviar__comentario'
                    onClick={enviarComentario}>
                    <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-glyphs/30/paper-plane.png"
                        alt="paper-plane" />
                </span>
            </div>
            {errors['comentario']?.type === 'required' && <label className="error_input px-4">Campo requerido</label>}
        </>
    )
}

export default Comentario