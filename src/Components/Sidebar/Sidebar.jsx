import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
function Sidebar({ content }) {
    const [isOpen, setIsOpen] = useState(true);
    const [calculo, setCalculo] = useState(window.innerHeight);
    const [altura, setAltura] = useState(0);
    const navBar = document.getElementsByClassName("navbar");
    useEffect(() => {
        setAltura(navBar[0].offsetHeight);
    }, [isOpen])

    useEffect(() => {
        toggleSidebar();
    }, [])

    useEffect(() => {
        const handleResize = () => {
            console.log('resize');
            if (window.innerWidth >= 992) {
                setIsOpen(true); // Cierra el Sidebar en pantallas grandes
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth <= 992) {
            setIsOpen(!isOpen); // Cierra el Sidebar en pantallas grandes
        }

    };

    return (
        <>
            {/* Botón para abrir la Sidebar */}
            {!isOpen &&
                <button className="btn btn-primary" onMouseEnter={toggleSidebar}>
                    Abrir Sidebar
                </button>
            }

            {/* Sidebar */}
            <div
                className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
                onMouseLeave={toggleSidebar}
                tabIndex="-1"
                id="sidebar"
                aria-labelledby="sidebarLabel"
                style={{ visibility: isOpen ? "visible" : "hidden", height: calculo, paddingTop: `${altura}px`, zIndex: 99 }}
            >
                {content}
            </div>
        </>
    );
}

export default Sidebar;