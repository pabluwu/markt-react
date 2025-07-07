import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecurso } from "../../services/useRecursosUsuarios";

import Navbar from "../../Components/Navbar/Navbar";
import PdfPreviewUsuario from './Components/PdfPreviewUsuario';


const VerRecursoUsuarios = () => {
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
            {recurso && <PdfPreviewUsuario fileUrl={recurso.archivo} obj={recurso}/>}
        </>
    )
}

export default VerRecursoUsuarios;