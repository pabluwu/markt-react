import { useState } from "react";
import Tab from "../../../Components/Tab/Tab";
import Seguidos from "../../../Components/Seguidos/Seguidos";
const Contactos = ({id_user}) => {
    const opciones = [
        { key: 'seguidos', nombre: 'Seguidos' },
        { key: 'contactos', nombre: 'Contactos Profesionales' }
    ]
    const [selectedOption, setSelectedOption] = useState(opciones[0]);
    return (
        <>
            <Tab
                opciones={opciones}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />

            {
                selectedOption.key == 'seguidos' &&
                <Seguidos id_user={id_user}/>
            }
        </>

    )
}

export default Contactos;