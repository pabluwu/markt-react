import { useQuery } from "@tanstack/react-query";
import { api } from "../assets/variables";


export const useIdEmailUsuarios = () => {
    const acc = localStorage.getItem("access_token");
    const get = async () => {
        const res = await fetch(`${api}api/usuario/id_email_all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return res.json();
    }

    const {
        data: usuarios,
    } = useQuery({ queryKey: ['usuariosIdEmail'], queryFn: get });

    return {
        usuarios,
    }
}



