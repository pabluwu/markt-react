import { useState } from "react";
import { useLocation } from "react-router-dom"; // Importa useLocation
import Search from "../Search/Search";
import SessionButton from "./SesionButton";
import logo_markt from "../../assets/Markt.png";

const Navbar = () => {
    const location = useLocation(); // Obtiene la ruta actual (ej: "/home")

    // Función para verificar si el enlace es la ruta actual
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar bg-white border-bottom navbar-dark navbar-expand-lg navbar-light bg-navbar fixed-top">
            <div className="container">
                <a className="navbar-brand text-dark" href="/">
                    <img src={logo_markt} width="100" alt="" />
                </a>
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
                        <li className="nav-item">
                            <a
                                className={`nav-link text-dark ${isActive("/empresas") ? "fw-bold" : ""}`}
                                href="/empresas"
                            >
                                {isActive("/empresas") ? <strong>Empresas</strong> : "Empresas"}
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