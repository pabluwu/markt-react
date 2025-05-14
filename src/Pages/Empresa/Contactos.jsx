import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../assets/variables";
import { verSolicitudesContacto } from "../../services/useEmpresas";

import Tab from "../../Components/Tab/Tab";
import SolicitudItem from "../../Components/Solicitudes/SolicitudItem";
import ContactCard from "../../Components/ContactCard/ContactCard";
const ContactosEmpresa = ({ id, type, refetchLength}) => {
    const opciones = [
        { key: 'mis-contactos', nombre: 'Mis Contactos', estado: 1 },
        { key: 'solicitudes', nombre: 'Solicitudes', estado: 0 }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0])

    const { data: solicitudes, refetch: solicitudesRefetch, isLoading } = useQuery(
        {
            queryKey: ['solicitudes', id],
            queryFn: () => verSolicitudesContacto(id, type, selectedOption.estado),
            enabled: true
        }
    );

    useEffect(() => {
        solicitudesRefetch();
        refetchLength();
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
                    <SolicitudItem solicitud={item} refetch={solicitudesRefetch} />
                ))
            }
        </>
    )
}

export default ContactosEmpresa;