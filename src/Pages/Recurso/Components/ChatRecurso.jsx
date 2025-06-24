import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { consultarRecurso } from '../../../services/useRecursos';

const ChatRecurso = ({ recursoId, titulo }) => {
    const [conversacion, setConversacion] = useState([]);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const consultarMutation = useMutation({
        mutationFn: (data) => consultarRecurso(recursoId, data.pregunta),
        onSuccess: (respuesta, variables) => {
            const nuevaConsulta = {
                pregunta: variables.pregunta,
                respuesta: respuesta.respuesta,
                fecha: new Date(respuesta.fecha_consulta).toLocaleString('es-ES')
            };

            setConversacion(prev => [...prev, nuevaConsulta]);
            reset();
        },
        onError: (error) => {
            console.error('Error al consultar:', error);
        }
    });

    const onSubmit = (data) => {
        consultarMutation.mutate(data);
    };

    return (
        <div className="bg-white border rounded shadow-sm">
            <div className="p-3 border-bottom bg-light">
                <h6 className="fw-semibold mb-1">Chat sobre: {titulo}</h6>
                <small className="text-muted">Haz preguntas sobre este documento</small>
            </div>

            <div className="p-3" style={{ height: '300px', overflowY: 'auto' }}>
                {conversacion.length === 0 ? (
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <p className="text-muted text-center mb-0">
                            No hay mensajes aún. ¡Haz tu primera pregunta!
                        </p>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {conversacion.map((msg, index) => (
                            <div key={index} className="d-flex flex-column gap-2">
                                {/* Mensaje del usuario */}
                                <div className="d-flex justify-content-end">
                                    <div className="bg-primary text-white rounded p-2" style={{ maxWidth: '85%' }}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <small className="fw-semibold">Tú</small>
                                            <small className="opacity-75">{msg.fecha}</small>
                                        </div>
                                        <div className="small">{msg.pregunta}</div>
                                    </div>
                                </div>
                                
                                {/* Respuesta de la IA */}
                                <div className="d-flex justify-content-start">
                                    <div className="bg-light border rounded p-2" style={{ maxWidth: '85%' }}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <small className="fw-semibold text-muted">IA</small>
                                            <small className="text-muted">{msg.fecha}</small>
                                        </div>
                                        <div className="small text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                                            {msg.respuesta}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {consultarMutation.isPending && (
                    <div className="d-flex justify-content-start">
                        <div className="bg-light border rounded p-2" style={{ maxWidth: '85%' }}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <small className="fw-semibold text-muted">IA</small>
                            </div>
                            <div className="d-flex gap-1">
                                <div className="spinner-border spinner-border-sm text-muted" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <small className="text-muted">Procesando pregunta...</small>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-3 border-top bg-light">
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        {...register("pregunta", { 
                            required: "La pregunta es requerida",
                            minLength: {
                                value: 3,
                                message: "La pregunta debe tener al menos 3 caracteres"
                            }
                        })}
                        placeholder="Escribe tu pregunta aquí..."
                        disabled={consultarMutation.isPending}
                        className={`form-control form-control-sm ${errors.pregunta ? 'is-invalid' : ''}`}
                    />
                    <button 
                        type="submit" 
                        disabled={consultarMutation.isPending}
                        className="btn btn-primary btn-sm"
                    >
                        {consultarMutation.isPending ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                Enviando
                            </>
                        ) : (
                            'Enviar'
                        )}
                    </button>
                </div>
                {errors.pregunta && (
                    <div className="invalid-feedback d-block mt-1">
                        {errors.pregunta.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ChatRecurso; 