import { api } from "../assets/variables";
import { useQuery } from "@tanstack/react-query";

export const getAllRecursos = async () => {
    const acc = localStorage.getItem("access_token");

    const response = await fetch(`${api}api/recursos/`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    return response.json();

}

export const getRecurso = async (id) => {
    const acc = localStorage.getItem("access_token");

    const response = await fetch(`${api}api/recursos/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    return response.json();

}
