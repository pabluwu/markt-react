import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import { getAllRecursos } from "../../services/useRecursos";

import PublicNavbar from "../../Components/Navbar/PublicNav";
import Navbar from "../../Components/Navbar/Navbar";
import NewsBox from "./components/NewsBox";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import FadeOverlay from "./components/FadeOverlay";
import IfNotAuthenticated from "../../Components/IfNotAuthenticated/IfNotAuthenticated";
import CardDocumento from "./components/CardDocumento";

const PublicHome = () => {
    const getNoticias = async () => {
        const response = await fetch(`${api}api/noticias`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener noticias');
        }
        return response.json();
    };

    const { data: noticias = [], isLoading } = useQuery({
        queryKey: ['noticias_all'],
        queryFn: getNoticias,
    });

    const { data: recursos = [], refetch: refetchRecursos } = useQuery(
        {
            queryKey: ['recursos'], // La clave ahora es un objeto
            queryFn: () => getAllRecursos(),
        }
    );

    console.log(recursos);
    return (
        <>
            <Navbar />

            <div className="container py-4" style={{ overflow: 'hidden' }}>
                <h4 className="mb-4">Noticias</h4>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-9">
                        {/* Noticia destacada (grande) */}
                        {noticias.length > 0 && (
                            <NewsBox item={noticias[0]} />
                        )}

                        {/* Noticias pequeñas */}
                        <div className="row">
                            {noticias.slice(1, 4).map((item, i) => (
                                <div key={item.id || i} className="col-md-4 mb-3">
                                    <NewsCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <Sidebar />
                    </div>
                </div>
                <h4 className="mb-4 mt-4">Documentos</h4>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-9">
                        {/* Documentos */}
                        <div className="row">
                            {recursos.slice(0, 7).map((item, i) => (
                                <div key={item.id || i} className="col-md-4 mb-3">
                                    <CardDocumento documento={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <IfNotAuthenticated>
                <FadeOverlay />
            </IfNotAuthenticated>

        </>
    );
};

export default PublicHome;
