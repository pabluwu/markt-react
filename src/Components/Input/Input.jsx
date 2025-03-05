const Input = ({ label, register, required, name, errors, disabled, type }) => {
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
            {errors[name]?.type === 'required' && <p className="error_input">Campo requerido</p>}
        </div>
    )
}

export default Input;