import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import useStore from "../../store/userStore";
import { api } from "../../assets/variables";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, logout } = useAuth();
  const { user, setUser } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      //Obtener datos del usuario
      const res = async () => {
        const acc = localStorage.getItem("access_token");
        const responseUsuario = await fetch(`${api}api/usuario/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc}`
          },
        });

        const status = await responseUsuario.status;
        
        if(status == 401){
          logout();
        }
        setUser(await responseUsuario.json());
      }

      res();
    }
  }, [isAuthenticated])
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;