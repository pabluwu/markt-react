import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
function Sidebar({ content, id }) {
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

        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) backdrop.remove();

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
                tabIndex="-1"
                id={id}
                aria-labelledby={"sidebarLabel"}
                data-bs-backdrop="false"
                data-bs-keyboard="false"
                data-bs-scroll="true" 
                style={{ visibility: isOpen ? "visible" : "hidden", height: calculo, paddingTop: `${altura}px`, zIndex: 99 }}
            >
                {content}
            </div>
        </>
    );
}

export default Sidebar;