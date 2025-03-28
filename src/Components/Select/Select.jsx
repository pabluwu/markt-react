
import SelectArrow from "../../assets/SelectArrow.svg";
const Select = ({ label, register, required, name, values, errors, disabled }) => {
    return (
        <div className="text-start mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{label}</label>
            {disabled ?
                <input readOnly {...register(name, { required })} aria-invalid={errors[name] ? "true" : "false"} />
                :
                <select
                    className="form-control"
                    style={{
                        backgroundRepeat: "none",
                        backgroundPosition: "98% 10px;",
                        backgroundImage: `url(${SelectArrow})`,
                    }}
                    {...register(name, { required })}
                    aria-invalid={errors[name] ? "true" : "false"}>
                    <option value={''} defaultChecked></option>
                    {values.map((item, i) => (
                        <option value={item.id} key={i}>{item.nombre}</option>
                    ))}
                </select>
            }
            {errors[name]?.type === 'required' && <p className="error_input" role="alert">Campo requerido</p>}
        </div>
    )
}

export default Select;