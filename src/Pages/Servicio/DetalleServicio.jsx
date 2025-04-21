import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../../Components/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";
import ServicioInfo from "./Components/ServicioInfo";
import ContactarServicio from "./Components/ContactarServicio";

import { api, media_url } from "../../assets/variables";
import SampleAvatar from '../../assets/SampleAvatar.png';

const DetalleServicio = () => {
    const { id } = useParams();

    const obtenerDetalleServicio = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/servicios/detalle-servicio/?servicio_id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener información del like');
        }
        return response.json();
    };

    const { data: servicio, refetch: refetchServicio, isLoading, isError } = useQuery(
        {
            queryKey: ['servicio-detail', id],
            queryFn: obtenerDetalleServicio,
            enabled: !!id,
        }
    );

    console.log(servicio);
    return (
        <>
            {
                isLoading &&
                <Loader />
            }
            <Navbar />
            {
                servicio &&
                <div className="container-fluid">
                    <div className="row mt-4">
                        <div className="col-lg-3">
                            <div className="contenedorPerfilEmpresa">
                                <div className="cardEmpresa">
                                    <div className="text-center">
                                        <img className="rounded" src={
                                            servicio.empresa.imagen_perfil ?
                                                `${media_url}/${servicio.empresa.imagen_perfil}`
                                                :
                                                SampleAvatar
                                        } alt="" />
                                        {
                                            servicio.empresa &&
                                            <h2>{servicio.empresa.nombre_fantasia}</h2>
                                        }
                                    </div>
                                </div>
                                <ContactarServicio id={id}/>
                            </div>
                        </div>
                        <div className="col-lg-9">

                            <ServicioInfo servicio={servicio} />
                        </div>
                    </div>
                </div>
            }
            {
                isError &&
                <div className="d-flex justify-content-center mt-5">
                    <h1>Not found servicio</h1>
                </div>
            }
        </>
    )
}

export default DetalleServicio;