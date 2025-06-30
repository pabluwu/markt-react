import { api } from "../assets/variables";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

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

export const consultarRecurso = async (id, pregunta) => {
    const acc = localStorage.getItem("access_token");

    const response = await fetch(`${api}api/recursos/${id}/consultar/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
        body: JSON.stringify({ pregunta })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al consultar el recurso');
    }
    return response.json();
}

export const useRecursosInfinite = () => {

    const getPaginatedRecursos = async ({ pageParam }) => {
        const url = pageParam ? pageParam : `${api}api/recursos/`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener recursos paginados');
        }
        const data = await response.json();
        return {
            recursos: data.results,
            nextPageUrl: data.next,
        };
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch
    } = useInfiniteQuery({
        queryKey: ['recursos_infinite'],
        queryFn: getPaginatedRecursos,
        getNextPageParam: (lastPage) => lastPage.nextPageUrl,
        initialPageParam: null,
    });

    const allRecursos = data?.pages?.flatMap(page => page.recursos) || [];

    return {
        recursos: allRecursos,
        fetchNextRecursos: fetchNextPage,
        hasMoreRecursos: hasNextPage,
        isFetchingNextRecursos: isFetchingNextPage,
        isLoadingRecursos: isLoading,
        isErrorRecursos: isError,
        errorRecursos: error,
        refetchAllRecursos: refetch
    }
}

export const useDeleteRecurso = () => {
    return useMutation({
        mutationFn: async (id) => {
            const acc = localStorage.getItem("access_token");

            const response = await fetch(`${api}api/recursos/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${acc}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar el recurso');
            }

            return true;
        },
    });
};
