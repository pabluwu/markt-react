import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

import PublicHome from "./Pages/PublicHome/PublicHome";

//Administrador de empresas
import AdministradorEmpresa from "./Pages/Empresa/Administrador";

//Perfiles publicos
import PerfilUsuario from "./Pages/Perfil/Usuario";
import PerfilEmpresa from "./Pages/Perfil/Empresa";

import CrearEmpresa from "./Pages/CrearEmpresa/CrearEmpresa";

import DetalleServicio from "./Pages/Servicio/DetalleServicio";

import Licitacion from "./Pages/Licitacion/Licitacion";

//Repositorio
import SubirDocumento from "./Pages/Repositorio/SubirDocumento";
import VerRecurso from "./Pages/Recurso/VerRecurso";
import Noticias from "./Pages/Noticias/Noticias";
import Repositorio from "./Pages/Repositorio/Repositorio";
import AdminRepositorio from "./Pages/Repositorio/Admin";

//Repositorio usuario
import ManageRepositorio from "./Pages/RepositorioUsuario/Management";
import VerRecursoUsuarios from "./Pages/Recurso/VerRecursoUsuarios";

import ListEmpresas from "./Pages/Empresa/ListEmpresas";

import Comparador from "./Pages/Comparador/Comparador";
const UserRouter = () => {

    return (
        <Routes>
            {/* Páginas públicas */}

            <Route path='/' element={<PublicHome />} />
            <Route path="/home" element={
                <PrivateRoute element={<Home />} />
            } />
            <Route path="/empresa/:id" element={
                <PrivateRoute element={<AdministradorEmpresa />} />
            } />
            <Route path="/p/:username" element={
                <PrivateRoute element={<PerfilUsuario key={Math.random()} />} />
            } />
            <Route path="/c/:id" element={
                <PrivateRoute element={<PerfilEmpresa key={Math.random()} />} />
            } />
            <Route path="/servicio/:id" element={
                <PrivateRoute element={<DetalleServicio key={Math.random()} />} />
            } />
            <Route path="/crear-empresa" element={
                <PrivateRoute element={<CrearEmpresa key={Math.random()} />} />
            } />
            <Route path="/licitacion/:id" element={
                <PrivateRoute element={<Licitacion key={Math.random()} />} />
            } />

            {/* Página noticias */}
            <Route path="/noticias" element={
                <PrivateRoute element={<Noticias key={Math.random()} />} />
            } />

            {/* Repositorio */}
            <Route path="/repositorio/subir" element={
                <PrivateRoute element={<SubirDocumento key={Math.random()} />} />
            } />
            <Route path="/repositorio" element={
                <PrivateRoute element={<Repositorio key={Math.random()} />} />
            } />

            <Route path="/repositorio/admin" element={
                <PrivateRoute element={<AdminRepositorio key={Math.random()} />} />
            } />

            <Route path="/repositorio/doc/:id" element={
                <VerRecurso key={Math.random()} />
            } />

            <Route path="/empresas" element={
                <PrivateRoute element={<ListEmpresas key={Math.random()} />} />
            } />

            <Route path="/repositorio/management" element={
                <PrivateRoute element={<ManageRepositorio key={Math.random()} />} />
            } />

            <Route path="/repositorio/archivo/:id" element={
                <PrivateRoute element={<VerRecursoUsuarios key={Math.random()} />} />
            } />


            <Route path="/login" element={<Login />} />

            <Route path="/comparador-documentos" element={
                <PrivateRoute element={<Comparador key={Math.random()}/>} />
            } />
        </Routes >
    )
}

export default UserRouter;
