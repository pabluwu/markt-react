import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../services/AuthContext";
import useStore from "../../store/userStore";
import { useNavigate, Navigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const { login, isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    const onSubmit = async (data) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        });

        if (response.ok) {
            const tokens = await response.json();
            console.log(tokens)
            login(tokens.access, tokens.refresh);
            navigate('/home');
        } else {
            setError('Invalid credentials');
        }
    };
    return (
        <div className="bg-dark" style={{
            height: '100vh',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%'
        }}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="bg-light w-75 h-75 rounded position-relative container">
                    <div className="row rounded h-100">
                        <div className="col-sm-6 rounded bg-secondary h-100 d-none d-lg-block">
                        </div>
                        <div className="col-md-12 col-lg-6 py-4 text-center">

                            <div className="d-flex justify-content-center align-items-center py-4">
                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Logo" className="w-25 h-25" />
                            </div>
                            <h2>Markt</h2>
                            <h4>Inicia sesión</h4>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <Input
                                        label={'Nombre de usuario'}
                                        register={register}
                                        required={{ required: 'Campo requerido' }}
                                        name={'username'}
                                        errors={errors}
                                        type={'text'}
                                    />
                                    <Input
                                        label={'Contraseña'}
                                        register={register}
                                        required={{ required: 'Campo requerido' }}
                                        name={'password'}
                                        errors={errors}
                                        type={'password'}
                                    />
                                </div>
                                <button type="submit" className="btn btn-azul mt-3">Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login