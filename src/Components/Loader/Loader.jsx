import './style.css'
const Loader = () => {
    return (
        <div className="loader">
            <div className="d-flex justify-content-center h-100 align-items-center">
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;