import { api } from "../assets/variables";

export const toggleSeguir = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/seguir/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Error al seguir');
    }
    return response.json();
};