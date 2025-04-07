import { useEffect } from "react";
import { updateEmpresa } from "../../services/useEmpresas";
import { useIdEmailUsuarios } from "../../services/useUsuarios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "../../Components/Input/Input";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import File from "../../Components/File/File";

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
        setValue('rut', empresa.rut)
        setValue('nombre_empresa', empresa.nombre_empresa)
        setValue('nombre_fantasia', empresa.nombre_fantasia)
        setValue('imagen_perfil', empresa.imagen_perfil)
        setValue('usuarios', [1])
    }, [empresa])

    const mutation = useMutation({
        mutationFn: (data) => updateEmpresa(data, empresa.id), // Asegúrate de que updateEmpresa sea una función que retorne una promesa
        onSuccess: (data) => {
            console.log('Empresa actualizada:', data);
            alert('Empresa actualizada exitosamente');
        },
        onError: (error) => {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la empresa');
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
                    <div className="col-md-6">
                        <Input
                            label={'Rut Empresa'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'rut'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <File
                            text={'Foto de perfil'}
                            register={register}
                            required={{ required: false }}
                            name={'imagen_perfil'}
                            errors={errors}
                            accept={"image/png, image/jpeg"}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Nombre Empresa'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre_empresa'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Nombre Fantasía'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre_fantasia'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-12 text-end">
                        <button type="submit" className="btn btn-azul mt-3">Guardar datos</button>
                    </div>
                </div>
            </form >
        </div>
    )
}

export default ConfigurarEmpresa;