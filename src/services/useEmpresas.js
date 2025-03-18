import { useQuery } from "@tanstack/react-query";
import { api } from "../assets/variables";


export const useMisEmpresas = () => {
    const acc = localStorage.getItem("access_token");
    const get = async () => {
        const res = await fetch(`${api}api/empresa/getByUser`, {
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
        data: misEmpresas,
    } = useQuery({ queryKey: ['misempresas'], queryFn: get });

    return {
        misEmpresas,
    }
}

export const getEmpresa = (id) => {
    const acc = localStorage.getItem("access_token");
    const get = async () => {
        const res = await fetch(`${api}api/empresa/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return res.json();
    }
    const {
        data: empresa,
        isLoading: empresaIsLoading,
        error,
    } = useQuery({ queryKey: ['empresa'], queryFn: get });

    return {
        empresa,
        empresaIsLoading,
        error
    }
}

export const updateEmpresa = async (data, id) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/empresa/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
};