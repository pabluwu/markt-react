const Footer = () => {
    return (
        <footer className="w-100 bg-white text-dark py-4 border-top">
            <div className="container pb-4">
                <div className="border-bottom pb-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-1">
                                <div class="px-2 py-1 bg-dark rounded">
                                    <span class="text-white font-bold text-sm">M</span>
                                </div>
                                <a className="mx-2 text-dark fs-3" href="/"><strong>Markt</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center pt-3">
                    <p className="text-muted">© 2025 Markt . Todos los derechos reservados.</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer;