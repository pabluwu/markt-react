import { api } from "../assets/variables";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const createPost = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/post/`, {
        method: 'POST',
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

export const getAllPost = () => {
    const acc = localStorage.getItem("access_token");

    const get = async () => {
        const response = await fetch(`${api}api/post/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener todos los posts');
        }
        return response.json();
    }

    const {
        data: posts,
        refetch: refetchAllPosts
    } = useQuery({ queryKey: ['posts'], queryFn: get });

    // console.log(posts);

    return {
        posts,
        refetchAllPosts
    }
}

export const getAllPostByEmpresa = (idEmpresa) => {
    const acc = localStorage.getItem('access_token');
    const get = async () => {
        const response = await fetch(`${api}api/post/${idEmpresa}/empresa`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener todos los posts');
        }
        return response.json();
    }

    // console.log('fetch all posts by empresa');

    const {
        data: postsEmpresa,
        refetch: refetchPosts
    } = useQuery({ queryKey: ['posts', idEmpresa], queryFn: get });

    // console.log(postsEmpresa);

    return {
        postsEmpresa,
        refetchPosts
    }
}

export const getAllPostByUser = (idUser) => {
    const acc = localStorage.getItem('access_token');

    const fetchPosts = async ({ pageParam = 1 }) => {
        const response = await fetch(`${api}api/post/${idUser}/user?page=${pageParam}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener posts paginados');
        }

        return response.json(); // Debe contener { results, next, previous }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['posts', idUser],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const nextUrl = new URL(lastPage.next);
                return nextUrl.searchParams.get('page');
            }
            return undefined;
        },
        enabled: !!idUser
    });

    return {
        postsUser: data?.pages?.flatMap(page => page.results) || [],
        fetchNextPosts: fetchNextPage,
        hasMorePosts: hasNextPage,
        isFetchingNextPosts: isFetchingNextPage,
        refetchAllPostByUser: refetch
    };

};

export const toggleLikePost = async (data) => {
    const acc = localStorage.getItem("access_token");
    const response = await fetch(`${api}api/like/toggle_like/`, {
        method: 'POST',
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

export const getLikeByLike = async (data) => {
    const acc = localStorage.getItem('access_token');

    const response = await fetch(`${api}api/like/check_liker?post_id=1&liker_id=1&like_type=empresa`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
        },
    })
    if (!response.ok) {
        throw new Error('Error al obtener todos los posts');
    }
    return response.json();
}

export const usePostsInfinite = () => {
    const acc = localStorage.getItem("access_token");

    const getPaginatedPosts = async ({ pageParam }) => {
        const url = pageParam ? pageParam : `${api}api/post/`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener posts paginados');
        }
        const data = await response.json();
        return {
            posts: data.results,
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
        queryKey: ['user_posts_infinite'],
        queryFn: getPaginatedPosts,
        getNextPageParam: (lastPage) => lastPage.nextPageUrl,
        initialPageParam: null, // Sigue siendo null para la primera carga
    });

    const allPosts = data?.pages?.flatMap(page => page.posts) || [];

    return {
        posts: allPosts,
        fetchNextPosts: fetchNextPage,
        hasMorePosts: hasNextPage,
        isFetchingNextPosts: isFetchingNextPage,
        isLoadingPosts: isLoading,
        isErrorPosts: isError,
        errorPosts: error,
        refetchAllPosts: refetch
    }
}