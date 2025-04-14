import './style.css'
const Loader = () => {
    return (
        <div className="loader">
            <div className="d-flex justify-content-center h-100 align-items-center">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;