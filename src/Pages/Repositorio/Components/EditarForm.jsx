import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../assets/variables';
import { useEffect, useState } from 'react';

import DatePickerCustom from '../../../Components/DatePicker/DatePicker';
import TagInput from '../../../Components/TagInput/TagInput';
import { toast } from 'react-toastify';

const EditarForm = ({ recurso, setShow, show, refetch }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(recurso);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        setValue
    } = useForm({
        defaultValues: {
            palabrasClaves: recurso.palabrasClaves || "",
            titulo: recurso.titulo || "",
            fecha: recurso.fecha_subida || "",
            descripcion: recurso.descripcion || "",
            fuente: recurso.fuente || "",
            rubro: recurso.rubro || "",
            link: recurso.link || "",
        }
    });

    const updateDocument = async (formData) => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/recursos/${recurso.id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${acc}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData);
        }

        return response.json();
    };

    const mutation = useMutation({
        mutationFn: updateDocument,
        onSuccess: () => {
            toast.success('Archivo subido exitosamente');
            reset();
            setIsSubmitting(false);
            setShow(false);
            refetch();
        },
        onError: (error) => {
            toast.error(`Error: ${error}`);
            setIsSubmitting(false);
        },
    });

    const onSubmit = (data) => {
        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('titulo', data.titulo);
        formData.append('descripcion', data.descripcion);
        formData.append('fecha_subida', new Date(data.fecha).toISOString());
        formData.append('fuente', data.fuente || '');
        formData.append('rubro', data.rubro);
        formData.append('link', data.link || '');
        if (data.imagen && data.imagen.length > 0) {
            formData.append('imagen', data.imagen[0]);
        }
        if (data.archivo && data.archivo.length > 0) {
            formData.append('archivo', data.archivo[0]);
        }
        formData.append('palabrasClaves', data.palabrasClaves || '');
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ':', pair[1]);
        // }
        mutation.mutate(formData);
    };


    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Editar Recurso N° {recurso.id}</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setShow(!show)}></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="modal-body">
                    <div className="container">
                        <div className='rounded bg-white'>
                            <div className="row">

                                <div className="col-md-6 mt-4">
                                    <label className="">Título (max 50 carácteres) *</label>
                                    <input
                                        className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                                        {...register('titulo', { required: true })}
                                        maxLength={50}
                                    />
                                    {errors.titulo && <div className="invalid-feedback">Este campo es obligatorio.</div>}
                                </div>

                                <div className="col-md-6 mt-0">
                                    <DatePickerCustom
                                        label={'Fecha de publicación'}
                                        name={'fecha'}
                                        control={control}
                                        errors={errors}
                                        required={{ required: true }} />
                                </div>


                                <div className="col-md-12">
                                    <label className="">Descripción (max 1000 carácteres)*</label>
                                    <textarea
                                        className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                                        {...register('descripcion', { required: true })}
                                        maxLength={1000}
                                    />
                                    {errors.descripcion && <div className="invalid-feedback">Este campo es obligatorio.</div>}
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Fuente (max 50 carácteres)</label>
                                    <input className="form-control" {...register('fuente')} />
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Rubro o temática *</label>
                                    <input
                                        className={`form-control ${errors.rubro ? 'is-invalid' : ''}`}
                                        {...register('rubro', { required: true })}
                                    />
                                    {errors.rubro && <div className="invalid-feedback">Este campo es obligatorio.</div>}
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Palabras claves</label>
                                    <TagInput errors={errors} name={'palabrasClaves'} control={control} />
                                    {errors.palabrasClaves && <div className="invalid-feedback">Este campo es obligatorio.</div>}
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Link (max 200 carácteres)</label>
                                    <input type="url" maxLength={200} className="form-control" {...register('link')} />
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Subir archivo</label>
                                    <input
                                        type="file"
                                        className={`form-control ${errors.archivo ? 'is-invalid' : ''}`}
                                        accept=".pdf,.doc,.docx,.txt"
                                        {...register('archivo', { required: false })}
                                    />
                                    {errors.archivo && <div className="invalid-feedback">Debes subir un archivo.</div>}
                                    {recurso.archivo &&
                                        <a className="text-decoration-underline font-italic text-primary" href={`${recurso.archivo}`} target="__blank">Revisa el actual aquí</a>
                                    }
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="">Subir imagen</label>
                                    <input
                                        type="file"
                                        className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
                                        accept=".png, .jpeg, .jpg"
                                        {...register('imagen')}
                                    />
                                    {recurso.imagen &&
                                        <a className="text-decoration-underline font-italic text-primary" href={`${recurso.imagen}`} target="__blank">Revisa el actual aquí</a>
                                    }
                                </div>

                                {/* <div className="col-12 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={isSubmitting || mutation.isLoading}
                                    >
                                        {isSubmitting || mutation.isLoading ? 'Subiendo...' : 'Subir Documento'}
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div >
                </div>
                <div className="modal-footer">
                    <button
                        type="submit"
                        className="btn btn-success mt-3"
                        disabled={isSubmitting || mutation.isLoading}>
                        {isSubmitting || mutation.isLoading ? 'Editando...' : 'Editar Documento'}
                    </button>
                    <span className="btn btn-secondary mt-3" onClick={() => setShow(false)}>Cancelar</span>
                    {/* <span className="btn btn-azul" onClick={onSubmit}>Publicar</span> */}
                </div>
            </form>
        </>
    );
};

export default EditarForm;
