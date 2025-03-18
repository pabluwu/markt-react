import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useStore from "../../../store/userStore";

import Input from "../../../Components/Input/Input";
import DatePickerCustom from "../../../Components/DatePicker/DatePicker";



const Configurar = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm();
    const { user } = useStore();
    // console.log(user);

    useEffect(() => {
        if (user) {
            setValue('rut', user.userprofile?.rut);
            setValue('nombre', user.first_name);
            setValue('primer_apellido', user.last_name);
            setValue('segundo_apellido', user.userprofile?.segundo_apellido);
            setValue('direccion', user.userprofile?.direccion);
            setValue('profesion', user.userprofile?.profesion);
        }
    }, [user])

    const onSubmit = (data) => {
        console.log(data);
        // mutation.mutate(data, empresa.id);
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
                            label={'Rut'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'rut'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Nombre'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'nombre'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Primer apellido'}
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
                            label={'Profesion'}
                            register={register}
                            required={{ required: 'Campo requerido' }}
                            name={'profesion'}
                            errors={errors}
                            type={'text'}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label={'Dirección'}
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
                            required={{required: true}}/>
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