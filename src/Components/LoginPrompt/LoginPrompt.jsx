const LoginPrompt = () => {
  return (
    <div className="card p-4 rounded border-0 shadow mt-4 text-center">
      <h6 className="fw-semibold mb-2">Acceso completo</h6>
      <p className="text-muted small mb-3">
        Inicia sesión para acceder a documentos exclusivos y contenido adicional.
      </p>
      <a className="btn btn-dark btn-sm text-white" href="/login">Iniciar Sesión</a>
    </div>
  );
}

export default LoginPrompt;
