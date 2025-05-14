import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useStore from "../../../store/userStore";
import { updateUsuario } from "../../../services/useUsuarios";
import { convertToFormData } from "../../../services/convertFormData";
import { toast } from "react-toastify";
import { getAllEmpresas } from "../../../services/useEmpresas";

import Input from "../../../Components/Input/Input";
import DatePickerCustom from "../../../Components/DatePicker/DatePicker";
import Textarea from "../../../Components/Textarea/Textarea";
import File from "../../../Components/File/File";
import AutocompleteInput from "../../../Components/Autocomplete/Autocomplete";


const Configurar = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm();
    const { user } = useStore();
    console.log(user);

    useEffect(() => {
        if (user) {
            setValue('idUser', user.id);
            setValue('rut', user.userprofile?.rut);
            setValue('nombre', user.first_name);
            setValue('primer_apellido', user.last_name);
            setValue('segundo_apellido', user.userprofile?.segundo_apellido);
            setValue('direccion', user.userprofile?.direccion);
            setValue('profesion', user.userprofile?.profesion);
            setValue('fecha_nacimiento', user.userprofile?.fecha_nacimiento);
            setValue('sobre_mi', user.userprofile?.sobre_mi);
        }
        if (user.cargo_empresa) {
            setValue('cargo', user.cargo_empresa?.cargo);
            setValue('empresa_cargo', user.cargo_empresa?.empresa?.id);
        }
    }, [user])

    const mutation = useMutation({
        mutationFn: (data) => updateUsuario(data), // Asegúrate de que updateEmpresa sea una función que retorne una promesa
        onSuccess: (data) => {
            toast.success('Usuario actualizado exitosamente');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.detail || error.message || 'Hubo un error al actualizar el usuario';
            toast.error(`Error: ${errorMessage}`);
        },
    });

    const { data: empresas, refetch: refetchEmpresas } = useQuery(
        {
            queryKey: ['empresas'], // La clave ahora es un objeto
            queryFn: getAllEmpresas,
        }
    );

    console.log(empresas);

    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    }
    return (
        <div className="rounded mis-empresas-card p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12">
                        Edita tus datos
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Rut*'}
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
                            label={'Nombre*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Primer apellido*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'primer_apellido'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Segundo apellido'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'segundo_apellido'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Profesion*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'profesion'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Dirección*'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'direccion'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <DatePickerCustom
                            label={'Fecha de nacimiento'}
                            name={'fecha_nacimiento'}
                            control={control}
                            errors={errors}
                            required={{ required: true }} />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Cargo'}
                            register={register}
                            required={{ required: false }}
                            name={'cargo'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        {
                            empresas &&
                            <AutocompleteInput
                                name={'empresa_cargo'}
                                control={control}
                                options={empresas}
                                searchKey={'nombre_fantasia'}
                                valueKey={'id'}
                                placeholder={'Buscar empresa'}
                                rules={{ required: false }}
                                label={'Empresa'}
                            />
                        }
                    </div>
                    <div className="col-md-12">
                        <Textarea
                            label={'Sobre mí'}
                            register={register}
                            required={{ required: false }}
                            name={'sobre_mi'}
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

export default Configurar;