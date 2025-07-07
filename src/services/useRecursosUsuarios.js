import { api } from "../assets/variables";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

// Obtener todos los recursos (sin paginar, si se usa directamente)
export const getAllRecursos = async () => {
    const response = await fetch(`${api}api/recursos_usuarios/`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener recursos');
    }
    return response.json();
};

// Obtener recurso por ID
export const getRecurso = async (id) => {
    const response = await fetch(`${api}api/recursos_usuarios/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el recurso');
    }
    return response.json();
};

// Consultar recurso por ID con pregunta
export const consultarRecurso = async (id, pregunta) => {
    const acc = localStorage.getItem("access_token");

    const response = await fetch(`${api}api/recursos_usuarios/${id}/consultar/`, {
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
};

// Hook para obtener recursos paginados (infinite scroll)
export const useRecursosInfinite = ({ autoLoadAll = false, authorType = null, authorId = null } = {}) => {
    const enabled = authorType != null && authorId != null;

    const getPaginatedRecursos = async ({ pageParam }) => {
        let url = pageParam ?? `${api}api/recursos_usuarios/`;

        if (!pageParam && authorType && authorId) {
            const queryParams = new URLSearchParams({
                author_type: authorType.toLowerCase(),
                author_id: authorId
            });
            url += `?${queryParams.toString()}`;
        }

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
    };

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
        queryKey: ['recursos_usuarios_infinite', authorType, authorId],
        queryFn: getPaginatedRecursos,
        getNextPageParam: (lastPage) => lastPage.nextPageUrl,
        initialPageParam: null,
        enabled, // ← solo se ejecuta si los params existen
    });

    const fetchAllRecursos = async () => {
        let hasNext = true;
        while (hasNext) {
            const result = await fetchNextPage();
            const nextPage = result?.data?.pages?.at(-1)?.nextPageUrl;
            hasNext = !!nextPage;
        }
    };

    useEffect(() => {
        if (enabled && autoLoadAll && data?.pages?.length === 1 && hasNextPage) {
            fetchAllRecursos();
        }
    }, [autoLoadAll, data, enabled]);

    const allRecursos = data?.pages?.flatMap(page => page.recursos) || [];

    return {
        recursos: allRecursos,
        fetchNextRecursos: fetchNextPage,
        hasMoreRecursos: hasNextPage,
        isFetchingNextRecursos: isFetchingNextPage,
        isLoadingRecursos: isLoading,
        isErrorRecursos: isError,
        errorRecursos: error,
        refetchAllRecursos: refetch,
        fetchAllRecursos,
    };
};



// Hook para eliminar recurso por ID
export const useDeleteRecurso = () => {
    return useMutation({
        mutationFn: async (id) => {
            const acc = localStorage.getItem("access_token");

            const response = await fetch(`${api}api/recursos_usuarios/${id}/`, {
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
