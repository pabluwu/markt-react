import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";

import PublicNavbar from "../../Components/Navbar/PublicNav";
import NewsBox from "./components/NewsBox";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import FadeOverlay from "./components/FadeOverlay";

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

    console.log(noticias)

    return (
        <>
            <PublicNavbar />

            <div className="container py-4" style={{ overflow: 'hidden'}}>
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
                            {noticias.slice(1).map((item, i) => (
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
            </div>

            <FadeOverlay />
        </>
    );
};

export default PublicHome;
