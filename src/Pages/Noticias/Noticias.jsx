import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import Navbar from "../../Components/Navbar/Navbar";
import NewsBox from "../PublicHome/components/NewsBox";
import NewsCard from "../PublicHome/components/NewsCard";

const Noticias = () => {

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

    return (
        <>
            <Navbar />
            <div className="container py-4" style={{ overflow: 'hidden' }}>
                <h4 className="title-text mt-4">Noticias</h4>
                <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-12">
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
                </div>
            </div>
        </>
    )
}

export default Noticias;