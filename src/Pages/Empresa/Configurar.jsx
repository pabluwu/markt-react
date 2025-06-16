import { useEffect } from "react";
import { updateEmpresa } from "../../services/useEmpresas";
import { useIdEmailUsuarios } from "../../services/useUsuarios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { media_url } from "../../assets/variables";
import Input from "../../Components/Input/Input";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import File from "../../Components/File/File";
import Textarea from "../../Components/Textarea/Textarea";

const ConfigurarEmpresa = ({ empresa }) => {
    console.log(empresa);
    const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm();
    const { usuarios } = useIdEmailUsuarios();
    const usuariosOptions = usuarios?.map(item => ({ value: item.id, label: item.email }))

    useEffect(() => {
        if (usuarios && empresa) {
            const usuariosEnEmpresa = empresa.usuarios;
            if (usuariosEnEmpresa.length > 0) {
                const usuariosFiltrados = usuariosOptions.filter(item => usuariosEnEmpresa.includes(item.value));
                // console.log(usuariosFiltrados, 'usuarios filtrados');
                if (usuariosFiltrados.length > 0) {
                    setValue('usuarios', usuariosFiltrados.map(item => (item.value)));
                }
            }
        }
    }, [usuarios])

    useEffect(() => {
        setValue('rut', empresa.rut);
        setValue('nombre_empresa', empresa.nombre_empresa);
        setValue('nombre_fantasia', empresa.nombre_fantasia);              
        setValue('imagen_perfil', empresa.imagen_perfil);
        setValue('usuarios', [1])
        setValue('comuna', empresa.comuna);
        setValue('descripcion', empresa.descripcion);
        setValue('direccion_fisica', empresa.direccion_fisica);
        setValue('email_empresa', empresa.email_empresa);
        setValue('fecha_creacion', empresa.fecha_creacion);
        setValue('giro', empresa.giro);
        setValue('pagina_web', empresa.pagina_web);
        setValue('pais', empresa.pais);
        setValue('razon_social', empresa.razon_social);
        setValue('region', empresa.region);
        setValue('rubro', empresa.rubro);
        setValue('sector', empresa.sector);
        setValue('telefono_empresa', empresa.telefono_empresa);
    }, [empresa])

    const mutation = useMutation({
        mutationFn: (data) => updateEmpresa(data, empresa.id), // Asegúrate de que updateEmpresa sea una función que retorne una promesa
        onSuccess: (data) => {
            console.log('Empresa actualizada:', data);
            toast.success('Archivo subido exitosamente');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(`Error: ${error}`);
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data, empresa.id);
    }

    const watchusuarios = watch('usuarios');
    // console.log(watchusuarios);


    return (
        <div className="rounded mis-empresas-card p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12">
                        Edita los datos de la empresa
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Rut Empresa'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'rut'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-4">
                        <File
                            text={'Foto de perfil'}
                            register={register}
                            required={{ required: false }}
                            name={'imagen_perfil'}
                            errors={errors}
                            accept={"image/png, image/jpeg"}
                        />
                        {empresa.imagen_perfil &&
                            <a className="text-decoration-underline font-italic text-primary" href={`${media_url}/${empresa.imagen_perfil}`} target="__blank">Revisa la imagen actual aquí</a>
                        }
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Nombre Empresa'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre_empresa'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Nombre Fantasía'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre_fantasia'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-4">
                        {
                            usuarios &&
                            <MultiSelect
                                control={control}
                                name={'usuarios'}
                                options={usuariosOptions}
                                label={'Selecciona los usuarios'}
                                errors={errors}
                                rules={{ required: 'Este campo es requerido' }} />
                        }
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Razón Social*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'razon_social'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Sector*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'sector'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Rubro*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'rubro'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Giro*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'giro'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Telefono empresa*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'telefono_empresa'}
                            errors={errors}
                            type={'tel'}
                            maxLength={9}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Email empresa*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'email_empresa'}
                            errors={errors}
                            type={'email'}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Dirección empresa*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'direccion_fisica'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'País*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'pais'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Región*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'region'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Comuna*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'comuna'}
                            errors={errors}
                            type={'text'}
                            maxLength={50}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label={'Página web'}
                            register={register}
                            required={{ required: false }}
                            name={'pagina_web'}
                            errors={errors}
                            type={'text'}
                            maxLength={255}
                        />
                    </div>
                    <div className="col-md-8">
                        <Textarea
                            label={'Descripción'}
                            register={register}
                            required={{ required: false }}
                            name={'descripcion'}
                            errors={errors}
                            watch={watch}
                        />
                    </div>
                    <div className="col-12 text-end">
                        <button type="submit" className="btn btn-azul mt-3">Guardar datos</button>
                    </div>
                </div>
            </form >
        </div>
    )
}

export default ConfigurarEmpresa;