import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Components/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";
import LicitacionInfo from "./Components/LicitacionInfo";
import ContactarLicitacion from "./Components/ContactarLicitacion";
import { api, media_url } from "../../assets/variables";
const Licitacion = () => {
    const { id } = useParams();
    const obtenerDetalleLicitacion = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/licitacion/detalle-licitacion/?licitacion_id=${id}`, {
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

    const { data: licitacion, refetch: refetchLicitacion, isLoading, isError } = useQuery(
        {
            queryKey: ['licitacion-detail', id],
            queryFn: obtenerDetalleLicitacion,
            enabled: !!id,
        }
    );

    console.log(licitacion);
    return (
        <>
            {
                isLoading &&
                <Loader />
            }
            <Navbar />
            {
                licitacion &&
                <div className="container-fluid">
                    <div className="row mt-4">
                        <div className="col-lg-3">
                            <div className="contenedorPerfilEmpresa">
                                <div className="cardEmpresa">
                                    <div className="text-center">
                                        <img className="rounded" src={
                                            licitacion.empresa.imagen_perfil ?
                                                `${media_url}/${licitacion.empresa.imagen_perfil}`
                                                :
                                                SampleAvatar
                                        } alt="" />
                                        {
                                            licitacion.empresa &&
                                            <h2>{licitacion.empresa.nombre_fantasia}</h2>
                                        }
                                    </div>
                                </div>
                                <ContactarLicitacion id={id} />
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <LicitacionInfo licitacion={licitacion} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Licitacion;