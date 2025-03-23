const Textarea = ({ label, register, required, name, errors, disabled }) => {
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
            {errors[name]?.type === 'required' && <p className="error_input">Campo requerido</p>}
        </div>
    )
}

export default Textarea;