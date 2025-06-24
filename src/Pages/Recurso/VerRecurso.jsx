import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecurso } from "../../services/useRecursos";

import Navbar from "../../Components/Navbar/Navbar";
import PdfPreview from "./Components/PdfPreview";


const VerRecurso = () => {
    const { id } = useParams();

    const { data: recurso, refetch: refetchRecurso } = useQuery(
        {
            queryKey: ['recurso', id],
            queryFn: () => getRecurso(id),
        }
    );

    console.log(recurso);
    return (
        <>
            <Navbar />
            {recurso && <PdfPreview fileUrl={recurso.archivo} obj={recurso}/>}
        </>
    )
}

export default VerRecurso;