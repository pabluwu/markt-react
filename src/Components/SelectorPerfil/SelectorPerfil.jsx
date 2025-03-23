import { useState, useEffect } from "react";
import { useMisEmpresas } from "../../services/useEmpresas";
import useStore from "../../store/userStore";

const SelectorPerfil = ({ misEmpresas, user, setSelected, setLike, refetch }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const empresas = misEmpresas.map(item => ({ id: item.id, type: 'empresa', nombre: item.nombre_fantasia }));
        const usuario = { id: user.id, type: 'user', nombre: user.first_name };
        setOptions([usuario, ...empresas ])
    }, [misEmpresas, user])
    
    const handleChange = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        setSelected(selectedValue);
        console.log('cambiar usuario', selectedValue);
    }
    return (
        <select
            name="form-control" 
            onChange={handleChange}>
            {
                options &&
                options.length > 0 &&
                options.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>{item.nombre}</option>
                ))
            }
        </select>

    )
}

export default SelectorPerfil;