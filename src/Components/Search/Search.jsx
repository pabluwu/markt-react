import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../../assets/variables";
import { Link } from "react-router-dom";

const Search = () => {
    const { formState: { errors }, watch, register } = useForm();
    const search = watch('search_nav');
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const busquedaGlobal = async () => {
        const acc = localStorage.getItem('access_token');
        const response = await fetch(`${api}api/search/?q=${debouncedSearch}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acc}`
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener información del like');
        }
        return response.json();
    };

    const { data } = useQuery({
        queryKey: ['busqueda', debouncedSearch],
        queryFn: busquedaGlobal,
        enabled: !!debouncedSearch,
    });

    // Solo queremos mostrar estas claves
    const allowedKeys = ['markt.empresa', 'auth.user'];
    const filteredData = data
        ? Object.entries(data).filter(([key, value]) => allowedKeys.includes(key) && value.length > 0)
        : [];

    return (
        <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
            <div className="d-flex">
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Buscar"
                    autoComplete="off"
                    {...register('search_nav', { required: true })}
                />
                <span className="btn btn-verde" type="submit">
                    Buscar
                </span>
            </div>

            {/* Dropdown de resultados */}
            {debouncedSearch && filteredData.length > 0 && (
                <div className="position-absolute w-100 mt-1 bg-white border rounded shadow z-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {filteredData.map(([key, results]) => (
                        <div key={key} className="border-bottom px-2 py-1">
                            <div className="fw-bold text-muted small text-uppercase">
                                {
                                    key == 'auth.user' ?
                                    'Usuarios'
                                    :
                                    'Empresas'
                                }
                            </div>
                            {results.map((item, index) => (
                                <Link
                                    to={
                                        key === "auth.user" ? 

                                         `/p/${item.username}`
                                         :
                                         `/c/${item.id}`
                                    }
                                    key={index}
                                    className="list-group-item list-group-item-action py-1 px-2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => console.log("Seleccionado:", item)}
                                >
                                    {key === "auth.user" ? (
                                        <div>
                                            <strong>{item.username}</strong> - {item.first_name} {item.last_name}
                                        </div>
                                    ) : key === "markt.empresa" ? (
                                        <div>
                                            <strong>{item.nombre_fantasia}</strong> — {item.nombre_empresa}
                                        </div>
                                    ) : (
                                        <div>{JSON.stringify(item)}</div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
