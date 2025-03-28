const InputArray = ({ label, register, required, name, errors, disabled, type, nameItem, index, nameCheck }) => {
    // console.log(errors);
    return (
        <div className="text-start mt-4">
            <label>
                {label}
            </label>
            <input
                className="form-control"
                type={type}
                {...register(name, required)}
                readOnly={disabled}
                aria-invalid={errors[name] ? "true" : "false"}
            />
            {
                errors[nameItem] &&
                errors[nameItem][index] &&
                errors[nameItem][index][nameCheck] &&
                errors[nameItem][index][nameCheck] && <p className="error_input">Campo requerido</p>
            }
        </div>
    )
}

export default InputArray;