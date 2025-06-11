import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../services/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Input from "../../Components/Input/Input";
import { api } from "../../assets/variables";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const [responseBack, setResponseBack] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    const onSubmit = async (data) => {
        const response = await fetch(`${api}api/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        });

        if (response.ok) {
            const tokens = await response.json();
            login(tokens.access, tokens.refresh);
            navigate('/home');
        } else {
            setError('Invalid credentials');
        }

        setResponseBack(response.status);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light">
            <div className="shadow p-4 rounded-4 bg-white" style={{ width: "100%", maxWidth: "420px" }}>
                <div className="text-center mb-4">
                    <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center mx-auto mb-2" style={{ width: 56, height: 56, fontSize: 24 }}>
                        M
                    </div>
                    <h4 className="mb-0">Markt</h4>
                    <p className="text-muted">Inicia sesión en tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Nombre de usuario o email</label>
                        <input
                            {...register("username", { required: "Campo requerido" })}
                            className={`form-control rounded-3 ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="tu@email.com"
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <input
                                {...register("password", { required: "Campo requerido" })}
                                type={showPassword ? "text" : "password"}
                                className={`form-control rounded-start-3 ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Tu contraseña"
                            />
                            <span
                                className="input-group-text bg-white rounded-end-3"
                                role="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                        {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                    </div>

                    {responseBack === 401 && (
                        <div className="text-danger mb-2">Credenciales inválidas</div>
                    )}

                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                        </div>
                        <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                    </div> */}

                    <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar sesión</button>

                    {/* <div className="text-center text-muted my-3">— o continúa con —</div>

                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-outline-dark w-50">
                            <i className="bi bi-google me-2"></i> Google
                        </button>
                        <button type="button" className="btn btn-outline-dark w-50">
                            <i className="bi bi-microsoft me-2"></i> Microsoft
                        </button>
                    </div> */}

                    <div className="text-center mt-4">
                        ¿No tienes una cuenta? <a href="#" className="text-primary text-decoration-none">Regístrate aquí</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
