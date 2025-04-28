import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../../store/userStore";
import { useMisEmpresas } from "../../../services/useEmpresas";

import Popup from "../../../Components/Popup/Popup";
import InputArray from "../../../Components/Input/InputArray";
import TextareaArray from "../../../Components/Textarea/TextareaArray";
import Input from "../../../Components/Input/Input";
import Textarea from "../../../Components/Textarea/Textarea";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import SelectorEmpresas from "./SelectorEmpresa";

import { api, formas_pago_choices, modalidades_choices } from "../../../assets/variables";
const ContactarLicitacion = ({ id }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const { misEmpresas } = useMisEmpresas();
    const { reset, handleSubmit, formState: { errors }, setValue, register, getValues, trigger, control, watch } = useForm({
        defaultValues: {
            productos: [{
                nombre: "",
                descripcion_breve: "",
                unidad_venta: "",
                precio_estimado: "",
                disponibilidad_geografica: ""
            }]
        }
    });
    const { user } = useStore();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productos"
    });

    const isProductValid = (index) => {
        const product = watch(`productos.${index}`);
        return product?.nombre && product?.descripcion_breve && product?.unidad_venta && product?.precio_estimado && product?.disponibilidad_geografica;
    };

    useEffect(() => {
        setValue('licitacion_id', +id)
    }, [user])

    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/servicio_licitacion/`, {
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
            alert('Servicio enviado correctamente');
            setOpenModal(false);
            reset();
        },
        onError: (error) => {
            console.log('Hubo un error al enviar solicitud', error);
        },
    });

    const onSubmit = async () => {
        setValue('empresa', selected.id);
        const isValid = await trigger();
        if (!isValid) {
            return;
        }
        mutation.mutate(getValues());
    }

    const contentModal = (
        <>

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ofertar</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setOpenModal(!openModal)}></span>
            </div>
            <div className="modal-body">
                <div>
                    <p style={{ margin: '0', }}>
                        A continuación puedes ofertar un servicio a esta licitación.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-12 mt-4">
                                <p>Elige la empresa con la cuál quieres ofertar</p>
                                {
                                    misEmpresas && misEmpresas.length > 0 &&
                                    <SelectorEmpresas
                                        misEmpresas={misEmpresas}
                                        setSelected={setSelected} />
                                }
                            </div>
                            <div className="col-m-12">
                                <Textarea
                                    label={'Descripción del servicio'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'descripcion'}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    label={'Tiempo promedio de entrega'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'tiempo_entrega'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-6">
                                <MultiSelect
                                    control={control}
                                    name={'modalidades_atencion'}
                                    options={modalidades_choices}
                                    label={'Modalidad de atención'}
                                    errors={errors}
                                    rules={{ required: 'Este campo es requerido' }} />
                            </div>
                            <div className="col-md-6">
                                <MultiSelect
                                    control={control}
                                    name={'formas_pago'}
                                    options={formas_pago_choices}
                                    label={'Formas de pago'}
                                    errors={errors}
                                    rules={{ required: 'Este campo es requerido' }} />
                            </div>
                            <div className="col-md-12">
                                <Textarea
                                    label={'Certificaciones y garantías (Opcional)'}
                                    register={register}
                                    name={'certificaciones'}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-12 mt-4">
                                <h5>
                                    Contacto
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Nombre'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_nombre'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Cargo'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_cargo'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Email'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_email'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Telefono'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_telefono'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    label={'Web'}
                                    register={register}
                                    required={{ required: 'Campo requerido' }}
                                    name={'contacto_web'}
                                    errors={errors}
                                    type={'text'}
                                />
                            </div>

                            <div className="col-12 mt-3">
                                <h5>Productos</h5>
                                {fields.map((item, index) => (
                                    <div key={item.id} className="border p-3 mb-2 rounded">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Nombre'}
                                                    register={register}
                                                    name={`productos.${index}.nombre`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'nombre'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Unidad de venta'}
                                                    register={register}
                                                    name={`productos.${index}.unidad_venta`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'unidad_venta'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Precio estimado'}
                                                    register={register}
                                                    name={`productos.${index}.precio_estimado`}
                                                    errors={errors}
                                                    type={'number'}
                                                    required={{ required: true }}
                                                    nameCheck={'precio_estimado'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputArray
                                                    label={'Disponibilidad geográfica'}
                                                    register={register}
                                                    name={`productos.${index}.disponibilidad_geografica`}
                                                    errors={errors}
                                                    type={'text'}
                                                    required={{ required: true }}
                                                    nameCheck={'disponibilidad_geografica'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <TextareaArray
                                                    label={'Descripción breve'}
                                                    register={register}
                                                    name={`productos.${index}.descripcion_breve`}
                                                    errors={errors}
                                                    required={{ required: true }}
                                                    nameCheck={'descripcion_breve'}
                                                    index={index}
                                                    nameItem={'productos'}
                                                />
                                            </div>
                                        </div>
                                        <button type="button" disabled={fields.length == 1 ? true : false} className="btn btn-danger mt-2" onClick={() => remove(index)}>Eliminar</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2 mx-2"
                                            onClick={() => append({
                                                nombre: "",
                                                descripcion_breve: "",
                                                unidad_venta: "",
                                                precio_estimado: "",
                                                disponibilidad_geografica: ""
                                            })}
                                            disabled={!fields.length || !isProductValid(fields.length - 1)} // Deshabilitar si el producto actual no es válido
                                        >
                                            Agregar Producto
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Guardar datos</button>
                                <span className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cancelar</span>
                            </div>

                        </div>
                    </form>
                </div>
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

                Quiero ofertar esta licitación

            </span>
        </>
    )
}

export default ContactarLicitacion;