import { useQuery } from "@tanstack/react-query";

import NoticiaItem from "./NoticiaItem";

import { api } from "../../assets/variables";
const Noticias = () => {
    
    const getNoticias = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/noticias`, {
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

    // Query para obtener el like, con 'enabled' activado solo cuando 'selected' tiene un id
    const { data: noticias, refetch: refetchNoticias } = useQuery(
        {
            queryKey: ['noticias_all'], // La clave ahora es un objeto
            queryFn: getNoticias,
        }
    );
    return (
        <>
            {
                noticias &&
                noticias.length > 0 &&
                noticias.map((item, index) => (
                    <NoticiaItem noticia={item} key={index}/>
                ))
            }
        </>
    )
}

export default Noticias;