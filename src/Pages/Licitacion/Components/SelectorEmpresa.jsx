import { useState, useEffect } from "react";

const SelectorEmpresas = ({ misEmpresas, user, setSelected }) => {
    const [options, setOptions] = useState(null);
    useEffect(() => {
        const empresas = misEmpresas.map(item => ({ id: item.id, type: 'empresa', nombre: item.nombre_fantasia }));
        setSelected(empresas[0]);
        setOptions([...empresas])
    }, [misEmpresas])

    const handleChange = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        setSelected(selectedValue);
    }
    return (
        <select
            className="form-control"
            name="empresa"
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

export default SelectorEmpresas;