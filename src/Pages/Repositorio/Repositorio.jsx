import { useQuery } from "@tanstack/react-query";
import { getAllRecursos } from "../../services/useRecursos";

import Navbar from "../../Components/Navbar/Navbar";
import CardDocumento from "../PublicHome/components/CardDocumento";

const Repositorio = () => {

    const { data: recursos = [], refetch: refetchRecursos } = useQuery(
        {
            queryKey: ['recursos'], // La clave ahora es un objeto
            queryFn: () => getAllRecursos(),
        }
    );

    return (
        <>
            <Navbar />
            <div className="container py-4" style={{ overflow: 'hidden' }}>
                <h4 className="mt-4 title-text">Documentos</h4>
                <div style={{ width: '4rem', backgroundColor: '#0f0f0f', height: '.25rem' }}></div>

                <div className="row">
                    {/* Col principal */}
                    <div className="col-lg-12">
                        {/* Documentos */}
                        <div className="row">
                            {recursos.map((item, i) => (
                                <div key={item.id || i} className="col-md-4 mb-3">
                                    <CardDocumento documento={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Repositorio;