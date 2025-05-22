const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg navbar-light bg-navbar fixed">
            <div className="container">
                <a className="navbar-brand text-white" href="/home">Markt</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default PublicNavbar;