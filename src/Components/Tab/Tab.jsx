import './style.css';
const Tab = ({ opciones, selectedOption, setSelectedOption }) => {
    return (
        <>
            <div className="d-flex mt-4">
                {
                    opciones &&
                    opciones.map(item => (
                        <div
                            key={item.key}
                            onClick={() => setSelectedOption(item)}
                            className={selectedOption.key == item.key ? "tab-options active" : 'tab-options text-muted'}>
                            <p><strong>{item.nombre}</strong></p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Tab;