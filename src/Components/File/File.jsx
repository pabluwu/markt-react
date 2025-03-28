const File = ({ archivo, text, register, required, name, errors, accept }) => {
    return (
        <div className="mt-4">
            <label id={name} htmlFor={name}>{text}</label>
            <input
                className="form-control"
                type="file"
                {...register(name, required)}
                name={name}
                id={name}
                accept={accept}
            />
            {
                errors[name]?.type === 'required' && <p className="error_input" role="alert">{'Campo requerido.'}</p>
            }
        </div>
    )
}

export default File;