import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createPost } from '../../services/usePost';
import { media_url } from '../../assets/variables';
import Popup from '../Popup/Popup';
import Tiptap from '../TipTap/TipTap';
import SampleAvatar from '../../assets/SampleAvatar.png';
const Publicar = ({ author_id, type, refetchPosts, author }) => {
    const [popUpCompartir, setPopupCompartir] = useState(false);
    // console.log(refetchPosts);
    const { reset, handleSubmit, formState: { errors }, setValue, control, getValues, trigger } = useForm();

    const mutation = useMutation({
        mutationFn: (data) => createPost(data), // Asegúrate de que updateEmpresa sea una función que retorne una promesa
        onSuccess: (data) => {
            reset();
            setPopupCompartir(false);
            refetchPosts();
            // alert('Post creado correctamente');

        },
        onError: (error) => {
            alert('Hubo un error al crear el post');
        },
    });

    const onSubmit = async () => {
        const isValid = await trigger('postContent');
        if (isValid) {
            setValue('type', type);
            setValue('author_id', author_id)
            const data = getValues();
            mutation.mutate(data);
        }
    }

    const contentCompartir = (
        <>

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Compartir publicación</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setPopupCompartir(!popUpCompartir)}></span>
            </div>
            <div className="modal-body">
                <div className="tiptap">
                    <Tiptap
                        name={'postContent'}
                        control={control}
                        errors={errors} />
                </div>
            </div>
            <div className="modal-footer">
                <span className="btn btn-secondary" onClick={() => setPopupCompartir(false)}>Cancelar</span>
                <span className="btn btn-azul" onClick={onSubmit}>Publicar</span>
            </div>

        </>
    )

    console.log(author);

    return (
        <>
            <Popup children={contentCompartir} show={popUpCompartir} setShow={setPopupCompartir} />
            <div className="rounded profile-card py-3">
                <div className="info-profile px-3">
                    {
                        type == 'user' ?
                            <img className='rounded' src={
                                author.userprofile?.imagen_perfil ?
                                    `${media_url}/${author.userprofile?.imagen_perfil}`
                                    :
                                    SampleAvatar
                            } alt="" />
                            :
                            <img className='rounded' src={
                                author.imagen_perfil ?
                                    `${media_url}/${author?.imagen_perfil}`
                                    :
                                    SampleAvatar
                            } alt="" />
                    }
                    <div className='compartir rounded-pill'
                        onClick={() => setPopupCompartir(true)}>
                        <p>Publica algo</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publicar;