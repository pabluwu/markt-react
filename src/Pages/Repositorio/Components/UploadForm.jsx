import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../assets/variables';

import DatePickerCustom from '../../../Components/DatePicker/DatePicker';
import TagInput from '../../../Components/TagInput/TagInput';
import { toast } from 'react-toastify';

const UploadForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
    } = useForm();

    const uploadDocument = async (formData) => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/recursos/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${acc}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData);
        }

        return response.json();
    };

    const mutation = useMutation({
        mutationFn: uploadDocument,
        onSuccess: () => {
            toast.success('Archivo subido exitosamente');
            reset();
        },
        onError: (error) => {

            toast.error(`Error: ${error}`);
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('titulo', data.titulo);
        formData.append('descripcion', data.descripcion);
        formData.append('fecha_subida', new Date(data.fecha).toISOString());
        formData.append('fuente', data.fuente || '');
        formData.append('rubro', data.rubro);
        formData.append('link', data.link || '');
        formData.append('archivo', data.archivo[0]);
        if (data.imagen && data.imagen.length > 0){
            formData.append('imagen', data.imagen[0]);
        }
        formData.append('palabrasClaves', data.palabrasClaves || '');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        mutation.mutate(formData);
    };

    console.log(getValues());
    console.log(errors);

    return (
        <div className="container mt-4">
            <div className='rounded p-4 shadow-sm bg-white'>

                <h3>Subir Documento</h3>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="row g-3">
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
                        <TagInput errors={errors} name={'palabrasClaves'} control={control}/>
                        {errors.palabrasClaves && <div className="invalid-feedback">Este campo es obligatorio.</div>}
                    </div>

                    <div className="col-md-6 mt-4">
                        <label className="">Link (max 200 carácteres)</label>
                        <input type="url" className="form-control" {...register('link')} />
                    </div>

                    <div className="col-md-6 mt-4">
                        <label className="">Subir archivo *</label>
                        <input
                            type="file"
                            className={`form-control ${errors.archivo ? 'is-invalid' : ''}`}
                            accept=".pdf,.doc,.docx,.txt"
                            {...register('archivo', { required: true })}
                        />
                        {errors.archivo && <div className="invalid-feedback">Debes subir un archivo.</div>}
                    </div>

                    <div className="col-md-6 mt-4">
                        <label className="">Subir imagen</label>
                        <input
                            type="file"
                            className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
                            accept=".png, .jpeg, .jpg"
                            {...register('imagen')}
                        />
                    </div>

                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Subiendo...' : 'Subir Documento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
