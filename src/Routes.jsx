import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

//Administrador de empresas
import AdministradorEmpresa from "./Pages/Empresa/Administrador";
const UserRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={
                <PrivateRoute element={<Home />}/>
            } />
            <Route path="/empresa/:id" element={
                <PrivateRoute element={<AdministradorEmpresa />}/>
            } />
            <Route path="/login" element={<Login />} />
        </Routes >
    )
}

export default UserRouter;
