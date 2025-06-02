import { useState } from "react";
import Search from "../Search/Search";
import SessionButton from "./SesionButton";
const Navbar = () => {
    return (
        <nav className="navbar bg-white border-bottom navbar-dark navbar-expand-lg navbar-light bg-navbar fixed">
            <div className="container">

                <div class="px-2 py-1 bg-dark rounded">
                    <span class="text-white font-bold text-sm">M</span>
                </div>
                <a className="navbar-brand mx-2 text-dark" href="/"><strong>Markt</strong></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active text-dark" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-dark" aria-current="page" href="/home">Feed</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-dark" aria-current="page" href="/noticias">Noticias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-dark" aria-current="page" href="/repositorio">Repositorio</a>
                        </li>
                    </ul>
                    <Search />
                    <SessionButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;