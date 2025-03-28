const TextareaArray = ({ label, register, required, name, errors, disabled, nameItem, index, nameCheck }) => {
    return (
        <div className="text-start mt-4">
            <label>
                {label}
            </label>
            <textarea
                {...register(name, required)}
                className="form-control"
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

export default TextareaArray;