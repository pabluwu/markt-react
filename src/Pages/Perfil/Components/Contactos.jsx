import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { verContactos } from "../../../services/useUsuarios";
import Tab from "../../../Components/Tab/Tab";
import Seguidos from "../../../Components/Seguidos/Seguidos";
import ContactCard from "../../../Components/ContactCard/ContactCard";
const Contactos = ({ id_user }) => {
    const opciones = [
        { key: 'seguidos', nombre: 'Seguidos' },
        { key: 'contactos', nombre: 'Contactos Profesionales' }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);

    const { data: contactos, refetch: contactosRefetch, isLoading } = useQuery(
        {
            queryKey: ['contactos_usuario', id_user],
            queryFn: () => verContactos(id_user),
        }
    );

    console.log(contactos);

    return (
        <>
            <Tab
                opciones={opciones}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />

            {
                selectedOption.key == 'seguidos' &&
                <Seguidos id_user={id_user} />
            }
            {
                selectedOption.key == 'contactos' &&
                contactos &&
                contactos.map(item => (
                    <ContactCard solicitud={item} />
                ))
            }
        </>

    )
}

export default Contactos;