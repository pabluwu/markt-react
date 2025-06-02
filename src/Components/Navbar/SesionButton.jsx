import { LogOut, LogIn } from "lucide-react";
import { useAuth } from "../../services/AuthContext";
import { Navigate } from "react-router-dom";
const SessionButton = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <>

            {
                isAuthenticated ?
                    <div onClick={logout} className="d-flex justify-content-center align-items-center gap-2 p-2 mx-2 rounded border" style={{ backgroundColor: 'white', cursor: 'pointer' }}>
                        <LogOut size={16} className="text-dark" />
                        <p className="text-dark m-0">
                            <strong>
                                Cerrar sesión
                            </strong>
                        </p>
                    </div>
                    :
                    <a href="/login" className="d-flex justify-content-center align-items-center gap-2 p-2 mx-2 rounded" style={{ backgroundColor: '#2563eb', cursor: 'pointer' }}>
                        <LogIn size={16} className="text-white" />
                        <p className="text-white m-0">
                            <strong>
                                Iniciar sesión
                            </strong>
                        </p>
                    </a>
            }
        </>
    )
}

export default SessionButton;