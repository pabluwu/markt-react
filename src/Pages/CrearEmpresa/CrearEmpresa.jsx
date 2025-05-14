import Navbar from "../../Components/Navbar/Navbar"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { convertToFormData } from "../../services/convertFormData";
import { api } from "../../assets/variables";
import { useNavigate } from "react-router-dom";

import Textarea from "../../Components/Textarea/Textarea";
import Input from "../../Components/Input/Input";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import File from "../../Components/File/File";
import Loader from "../../Components/Loader/Loader";
const CrearEmpresa = () => {
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, reset } = useForm({});
    const navigate = useNavigate();
    const createEmpresa = async (data) => {
        const acc = localStorage.getItem("access_token");
        const formData = convertToFormData(data)
        const response = await fetch(`${api}api/empresa/`, {
            method: 'post',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
            body: formData,
        });

        console.log(response, 'response');
        if (!response.ok) {
            console.log('vamos a tirar un error porques i');
            throw new Error('Error al crear el usuario');
        }
        return response.json();
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => createEmpresa(data), // Asegúrate de que updateEmpresa sea una función que retorne una promesa
        onSuccess: (data) => {
            navigate(`/empresa/${data.id}`);
        },
        onError: (error) => {
            console.log(error);
            alert('Hubo un error al crear la empresa', error.message);
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    }
    return (
        <>
            <Navbar />
            {
                isLoading &&
                <Loader />

            }
            <div className="container mt-4">
                <h3>Crear una empresa</h3>
                <div className="rounded mis-empresas-card p-3 mt-4">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
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
                            <div className="col-m-12">
                                <Textarea
                                    label={'Descripción'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'descripcion'}
                                    errors={errors}
                                    watch={watch}
                                />
                            </div>

                            <div className="col-12 text-start">
                                <button type="submit" className="btn btn-success mt-3">Crear empresa</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export default CrearEmpresa