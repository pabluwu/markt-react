import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toggleSeguir } from "../../services/useSeguir";
import { api } from "../../assets/variables";



const SeguirButton = ({ id_seguidor, id_seguido, type_seguidor, type_seguido }) => {

    const [isSiguiendo, setIsSiguiendo] = useState(false);
    const checkFollow = async () => {
        const acc = localStorage.getItem('access_token');
        try{

            console.log(`${api}api/seguir/check_follow/?id_seguidor=${id_seguidor}&id_seguido=${id_seguido}&type_seguidor=${type_seguidor}&type_seguido=${type_seguido}`, 'url a consultar')
        }catch(err){
            console.log(err);
        }
        console.log('cheques el follow');
        const response = await fetch(`${api}api/seguir/check_follow/?id_seguidor=${id_seguidor}&id_seguido=${id_seguido}&type_seguidor=${type_seguidor}&type_seguido=${type_seguido}`, {
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

    // Query para obtener el follow, con 'enabled' activado solo cuando hay un id de seguido
    const { data: seguido, refetch: seguidoRefetch } = useQuery(
        {
            queryKey: ['seguidos', id_seguidor],
            queryFn: checkFollow,
        }
    );

    // Use mutation para seguir
    const mutation = useMutation({
        mutationFn: (data) => toggleSeguir(data),
        onSuccess: () => {
            seguidoRefetch(); // Refetch el seguir después de la mutación
        },
        onError: (error) => {
            console.log('Hubo un error al dar like', error);
        },
    });

    const handleSeguir = () => {
        const data = {
            id_seguidor: id_seguidor,
            id_seguido: id_seguido,
            type_seguidor: type_seguidor,
            type_seguido: type_seguido
        }
        
        mutation.mutate(data);
    }

    console.log(seguido);

    useEffect(() => {
        console.log('actualizar useState');
        setIsSiguiendo(seguido?.following);
    }, [seguido])

    return (
        <span
            className="boton-seguir btn-azul text-center"
            onClick={handleSeguir}>
                {
                    isSiguiendo ?
                    'Dejar de seguir'
                    :
                    'Seguir'
                }
        </span>
    )
};

export default SeguirButton;