import './style.css';
const Tab = ({ opciones, selectedOption, setSelectedOption }) => {
    return (
        <>
            <div className="d-flex mt-4 rounded p-2" style={{ backgroundColor: '#F1F5F9' }}>
                {
                    opciones &&
                    opciones.map(item => (

                        !item.show ?
                            <div
                                key={item.key}
                                onClick={() => setSelectedOption(item)}
                                className={selectedOption.key == item.key ? "tab-options active rounded d-flex gap-3 align-items-center justify-content-center" : 'tab-options text-muted d-flex gap-3 align-items-center justify-content-center'}>
                                {
                                    item.icon ?
                                        item.icon : ''
                                }
                                <p><strong>{item.nombre}</strong></p>
                            </div>
                            :
                            ''

                    ))
                }
            </div>
        </>
    )
}

export default Tab;