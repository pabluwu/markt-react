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
import Footer from "../../Components/Footer/Footer";
import DocumentosRecientes from "../../Components/DocumentosRecientes/DocumentosRecientes";
import LoginPrompt from "../../Components/LoginPrompt/LoginPrompt";

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

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-9">
                        <h4 className="title-text">Noticias</h4>
                        <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>
                        {/* Noticia destacada (grande) */}
                        {noticias.length > 0 && (
                            <NewsBox item={noticias[0]} />
                        )}

                        {/* Noticias pequeñas */}
                        <div className="mt-5">
                            <div className="row ">
                                {noticias.slice(1, 4).map((item, i) => (
                                    <div key={item.id || i} className="col-md-4 mb-3">
                                        <NewsCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <Sidebar />
                        <DocumentosRecientes documents={recursos}/>
                        <IfNotAuthenticated>
                            <LoginPrompt />
                        </IfNotAuthenticated>

                    </div>
                </div>
                <h4 className="mt-4 title-text">Documentos</h4>
                <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-9">
                        {/* Documentos */}
                        <div className="row">
                            {recursos.slice(0, 7).map((item, i) => (
                                <div key={item.id || i} className="col-md-6 mb-3">
                                    <CardDocumento documento={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicHome;
