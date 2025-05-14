const Textarea = ({ label, register, required, name, errors, disabled, classes, watch }) => {
    const text = watch(name) || '';
    return (
        <div className={classes ? classes : 'text-start mt-4'}>
            <label>
                {label}
            </label>
            <textarea
                {...register(name, required)}
                className="form-control"
                readOnly={disabled}
                aria-invalid={errors[name] ? "true" : "false"}
                maxLength={255}

            />
            <p>
                {
                    `${text.length} / 255 caracteres`
                }
            </p>
            {errors[name]?.type === 'required' && <p className="error_input">Campo requerido</p>}
        </div>
    )
}

export default Textarea;