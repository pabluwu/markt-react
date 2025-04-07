import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import Tab from "../../Components/Tab/Tab";
import SolicitudItem from "../../Components/Solicitudes/SolicitudItem";
import ContactCard from "../../Components/ContactCard/ContactCard";
const ContactosEmpresa = ({ id, type }) => {
    const opciones = [
        { key: 'mis-contactos', nombre: 'Mis Contactos', estado: 1 },
        { key: 'solicitudes', nombre: 'Solicitudes', estado: 0 }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0])

    const verSolicitudes = async () => {
        if (id, type) {
            const acc = localStorage.getItem('access_token');
            try {
                const response = await fetch(`${api}api/conexion/solicitudes_conexion/?type=${type}&id=${id}&estado=${selectedOption.estado}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${acc}`
                    },
                })
                if (!response.ok) {
                    throw new Error('Error al obtener información del like');
                }
                return response.json();

            } catch (err) {
                console.log(err)
            }
        }
    };
    const { data: solicitudes, refetch: solicitudesRefetch, isLoading } = useQuery(
        {
            queryKey: ['solicitudes', id],
            queryFn: verSolicitudes,
            enabled: true
        }
    );

    useEffect(() => {
        solicitudesRefetch();
    }, [selectedOption])

    console.log(solicitudes);
    return (
        <>
            <Tab
                opciones={opciones}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />

            {
                selectedOption.key == 'mis-contactos' &&
                solicitudes &&
                solicitudes.filter(item => item.estado === 1).map(item => (
                    <ContactCard solicitud={item} />
                ))
            }
            {
                selectedOption.key == 'solicitudes' &&
                solicitudes &&
                solicitudes.filter(item => item.estado === 0).map(item => (
                    <SolicitudItem solicitud={item} />
                ))
            }
        </>
    )
}

export default ContactosEmpresa;