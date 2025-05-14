import { useQuery } from "@tanstack/react-query";
import { api } from "../assets/variables";
import { convertToFormData } from "./convertFormData";

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
    } = useQuery({ queryKey: ['empresa', id], queryFn: get });

    return {
        empresa,
        empresaIsLoading,
        error
    }
}

export const updateEmpresa = async (data, id) => {
    const acc = localStorage.getItem("access_token");
    const formData = convertToFormData(data)
    const response = await fetch(`${api}api/empresa/${id}/`, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
};

export const getAllEmpresas = async () => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/empresa/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${acc}`
        },
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
}

export const getEmpresasCargos = async (id, isValid) => {
    let url = `${api}api/cargo_empresa/?empresa_id=${id}`;
    if (isValid) {
        url = `${api}api/cargo_empresa/?empresa_id=${id}&is_valido=${isValid}`;
    }
    const acc = localStorage.getItem("access_token");
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${acc}`
        },
    });
    if (!response.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
    }

    // console.log(await response.json())
    return response.json();
}

export const verSolicitudesContacto = async (id, type, estado) => {
    if (id, type) {
        console.log(id, type, estado);
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/conexion/solicitudes_conexion/?type=${type}&id=${id}&estado=${estado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener información del like');
        }
        return response.json();
    }else{
        throw new Error('No incluye id o type');
    }
};
