const Popup = ({ show, children }) => {
    return (
        <>
            {
                show &&
                <>
                    <div className="modal-lg modal show fade" id="exampleModal" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div class="modal-backdrop fade show"></div>
                </>
            }
        </>
    )
}

export default Popup;