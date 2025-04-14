import { useMutation } from '@tanstack/react-query';
import { api } from '../../assets/variables';
import './style.css';
import Loader from '../Loader/Loader';
const SolicitudItem = ({ solicitud, refetch }) => {
    console.log(solicitud);
    const mutation = useMutation({
        mutationFn: async (data) => {
            const acc = localStorage.getItem("access_token");
            const response = await fetch(`${api}api/conexion/actualizar-estado/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acc}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al cambiar estado');
            }
            return response.json();
        },
        onSuccess: () => {
            // setOpenModal(false);
            refetch();
        },
        onError: (error) => {
            console.log('Hubo un error al enviar solicitud', error);
        },
    });

    const onAceptar = () => {
        mutation.mutate({ id: solicitud.id, estado: 1 });
    }

    const onRechazar = () => {
        mutation.mutate({ id: solicitud.id, estado: 2 });
    }
    return (
        <div className="box-solicitud w-100 border-box-shadow mt-3 px-3 py-3">

            {
                mutation.isLoading &&
                <Loader />
            }
            <div className="d-flex gap-4 w-100 justify-content-between align-items-center">
                {
                    solicitud.type == 'user' ?
                        <div className="datos-solicitud">
                            <p>
                                <strong>{`${solicitud.username}`}</strong> te ha solicitado contacto con el siguiente mensaje:
                            </p>
                            <p className='mt-1'>
                                <strong>
                                    {solicitud.detalle_conexion}
                                </strong>
                            </p>
                        </div>
                        :
                        ''
                }
                <div className='buttons-solicitudes'>
                    <span
                        className='btn btn-success'
                        onClick={onAceptar}>
                        Aceptar
                    </span>
                    <span
                        className='btn btn-danger'
                        onClick={onRechazar}>
                        Rechazar
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SolicitudItem;