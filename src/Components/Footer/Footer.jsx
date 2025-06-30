import logo_corfo from "../../assets/logo_corfo.jpg";
import logo_markt from "../../assets/Markt.png";
import terminosCondiciones from "../../assets/Terminos_y_Condiciones_de_Uso_de_Markt.pdf";
import { ExternalLink } from "lucide-react";
const Footer = () => {
    return (
        <footer className="w-100 bg-white text-dark mt-4 py-4 border-top">
            <div className="container pb-4">
                <div className="border-bottom pb-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-1">
                                <a className="mx-2 text-dark fs-3" href="/">
                                    <img src={logo_markt} width={150} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-1">
                                <ul>
                                    <li>
                                        <a href={terminosCondiciones} target="_blank">
                                            Términos y condiciones de uso

                                            <ExternalLink size={14} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-center align-items-center gap-1">
                                <a href="https://www.corfo.cl/sites/cpp/homecorfo" target="_blank">
                                    <img style={{ width: '150px' }} src={logo_corfo} alt="" />
                                </a>
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