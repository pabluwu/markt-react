import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import { toast } from "react-toastify";

import { MessageSquare } from "lucide-react";

import Popup from "../Popup/Popup";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";

const ContactarButton = ({ type, id }) => {
    const [openModal, setOpenModal] = useState(false);
    const { reset, handleSubmit, formState: { errors }, setValue, register, getValues, trigger, watch } = useForm();

    useEffect(() => {
        if (type && id) {
            setValue('id_seguido', id);
            setValue('type_seguido', type);
            setValue('type_seguidor', 'user');
        }
    }, [type, id])

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/conexion/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al seguir');
            }
            return response.json();
        },
        onSuccess: () => {
            setOpenModal(false);
            toast.success('Contacto enviado exitosamente');
        },
        onError: (error) => {
            console.log('Hubo un error al enviar solicitud', error);
            toast.error(`Error: ${error}`);
        },
    });

    const onSubmit = async () => {
        const isValid = await trigger();
        if (!isValid) {
            return;
        }
        mutation.mutate(getValues());
    }

    const contentModal = (
        <>

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Conectar con una empresa</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setOpenModal(!popUpCompartir)}></span>
            </div>
            <div className="modal-body">
                <div>
                    <p style={{ margin: '0', }}>
                        Para que la empresa pueda válidar su conexión profesional contigo, por favor detalla la relación que tienen</p>
                    <Textarea
                        classes={'text-start'}
                        label={''}
                        register={register}
                        required={{ required: 'Campo requerido' }}
                        name={'detalle_conexion'}
                        errors={errors}
                        watch={watch}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <span className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cancelar</span>
                <span className="btn btn-azul" onClick={onSubmit}>Publicar</span>
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
                className="boton-seguir btn-gray text-center w-100"
                onClick={() => setOpenModal(true)}
            >
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <MessageSquare size={16} />
                    Contactar
                </div>

            </span>
        </>
    )
}
export default ContactarButton;