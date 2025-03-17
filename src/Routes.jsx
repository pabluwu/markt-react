import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

//Administrador de empresas
import AdministradorEmpresa from "./Pages/Empresa/Administrador";

//Perfiles publicos
import PerfilUsuario from "./Pages/Perfil/Usuario";
import PerfilEmpresa from "./Pages/Perfil/Empresa";
const UserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute element={<Home />}/>
            } />
            <Route path="/home" element={
                <PrivateRoute element={<Home />}/>
            } />
            <Route path="/empresa/:id" element={
                <PrivateRoute element={<AdministradorEmpresa />}/>
            } />
            <Route path="/p/:username" element={
                <PrivateRoute element={<PerfilUsuario />}/>
            } />
            <Route path="/c/:id" element={
                <PrivateRoute element={<PerfilEmpresa />}/>
            } />
            <Route path="/login" element={<Login />} />
        </Routes >
    )
}

export default UserRouter;
