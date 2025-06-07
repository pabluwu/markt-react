import { useState } from "react";
import { useLocation } from "react-router-dom"; // Importa useLocation
import Search from "../Search/Search";
import SessionButton from "./SesionButton";

const Navbar = () => {
    const location = useLocation(); // Obtiene la ruta actual (ej: "/home")

    // Función para verificar si el enlace es la ruta actual
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar bg-white border-bottom navbar-dark navbar-expand-lg navbar-light bg-navbar fixed-top">
            <div className="container">
                <div className="px-2 py-1 bg-dark rounded">
                    <span className="text-white font-bold text-sm">M</span>
                </div>
                <a className="navbar-brand mx-2 text-dark" href="/"><strong>Markt</strong></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className={`nav-link text-dark ${isActive("/") ? "fw-bold" : ""}`}
                                href="/"
                            >
                                {isActive("/") ? <strong>Inicio</strong> : "Inicio"}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link text-dark ${isActive("/home") ? "fw-bold" : ""}`}
                                href="/home"
                            >
                                {isActive("/home") ? <strong>Feed</strong> : "Feed"}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link text-dark ${isActive("/noticias") ? "fw-bold" : ""}`}
                                href="/noticias"
                            >
                                {isActive("/noticias") ? <strong>Noticias</strong> : "Noticias"}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link text-dark ${isActive("/repositorio") ? "fw-bold" : ""}`}
                                href="/repositorio"
                            >
                                {isActive("/repositorio") ? <strong>Repositorio</strong> : "Repositorio"}
                            </a>
                        </li>
                    </ul>
                    <Search />
                    <SessionButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;