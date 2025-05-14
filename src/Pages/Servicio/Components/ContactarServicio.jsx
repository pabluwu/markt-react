import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../../store/userStore";

import Popup from "../../../Components/Popup/Popup";
import Input from "../../../Components/Input/Input";
import Textarea from "../../../Components/Textarea/Textarea";

import { api } from "../../../assets/variables";
const ContactarServicio = ({ id }) => {
    const [openModal, setOpenModal] = useState(false);
    const { reset, handleSubmit, formState: { errors }, setValue, register, getValues, trigger, watch } = useForm();
    const { user } = useStore();

    useEffect(() => {
        setValue('servicio', +id)
        setValue('nombre', user.first_name);
        setValue('email', user.email);
    }, [user])

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/contacto_servicio/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al contactar por servicio');
            }
            return response.json();
        },
        onSuccess: () => {
            setOpenModal(false);
        },
        onError: (error) => {
            console.log('Hubo un error al enviar solicitud', error);
        },
    });

    const onSubmit = async () => {
        console.log(getValues());
        const isValid = await trigger();
        if (!isValid) {
            return;
        }
        mutation.mutate(getValues());
    }

    const contentModal = (
        <>

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Contactar servicio</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setOpenModal(!openModal)}></span>
            </div>
            <div className="modal-body">
                <div>
                    <p style={{ margin: '0', }}>
                        A continuación puedes dejar un mensaje y tus datos de contacto al proveedor del servicio, para que se ponga en contacto contigo.
                    </p>
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <Input
                                label={'Nombre'}
                                register={register}
                                required={{ required: 'Campo requerido' }}
                                name={'nombre'}
                                errors={errors}
                                type={'text'}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <Input
                                label={'Teléfono'}
                                register={register}
                                required={{ required: 'Campo requerido' }}
                                name={'telefono'}
                                errors={errors}
                                type={'text'}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <Input
                                label={'Email'}
                                register={register}
                                required={{ required: 'Campo requerido' }}
                                name={'email'}
                                errors={errors}
                                type={'text'}
                            />
                        </div>
                    </div>
                    <Textarea
                        classes={'text-start'}
                        label={''}
                        register={register}
                        required={{ required: 'Campo requerido' }}
                        name={'mensaje'}
                        errors={errors}
                        watch={watch}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <span className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cancelar</span>
                <span className="btn btn-azul" onClick={onSubmit}>Enviar</span>
            </div>

        </>
    );
    return (
        <>
            {
                openModal &&
                <Popup children={contentModal} show={openModal} />
            }
            <span
                className="boton-seguir btn-azul text-center"
                onClick={() => setOpenModal(true)}
            >



                Me interesa este servicio

            </span>
        </>
    )
}

export default ContactarServicio;