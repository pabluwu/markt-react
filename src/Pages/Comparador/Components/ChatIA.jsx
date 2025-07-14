import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { MessageCircle, Bot, Send } from 'lucide-react';
import { compararRecursos } from '../../../services/useRecursosUsuarios';



const ChatIA = ({ recursosIds }) => {
    console.log(recursosIds);
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            content:
                '¡Hola! Soy tu asistente de IA para comparar documentos. ¿En qué puedo ayudarte?',
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);

    const { register, handleSubmit, reset, setFocus } = useForm();

    const consultarMutation = useMutation({
        mutationFn: (data) => compararRecursos(recursosIds, data.pregunta),
        onSuccess: (respuesta, variables) => {
            const mensajeBot = {
                sender: 'bot',
                content: respuesta.respuesta,
                timestamp: new Date(respuesta.fecha_consulta).toLocaleTimeString('es-ES'),
            };

            setMessages((prev) => [...prev, mensajeBot]);
            reset();
            setFocus('pregunta');
        },
        onError: (error) => {
            console.error('Error al consultar:', error);
        },
    });

    const onSubmit = (data) => {
        const pregunta = data.pregunta?.trim();
        if (!pregunta) return;

        const mensajeUsuario = {
            sender: 'user',
            content: pregunta,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, mensajeUsuario]);

        consultarMutation.mutate(data);
    };

    console.log(consultarMutation.isPending);
    useEffect(() => {
        if (consultarMutation.isPending) {
            // Agrega mensaje "escribiendo..."
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    content: 'Escribiendo...',
                    timestamp: '',
                    isTyping: true,
                },
            ]);
        } else {
            // Remueve el mensaje "escribiendo..." cuando termina
            setMessages((prev) => prev.filter((msg) => !msg.isTyping));
        }
    }, [consultarMutation.isPending]);


    return (
        <div>
            <div className="border rounded shadow-sm bg-white p-3">
                <div className="d-flex align-items-center mb-3">
                    <MessageCircle className="me-2" />
                    <h5 className="fw-bold m-0">Chat IA</h5>
                </div>

                <p className="text-muted">Analizando 1 documento</p>

                <div className="bg-light rounded p-3 mb-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-3 ${msg.sender === 'bot' ? 'text-dark' : 'text-end'}`}>
                            <div
                                className={`d-inline-flex align-items-start gap-2 p-3 rounded ${msg.sender === 'bot' ? 'bg-white' : 'bg-primary text-white'}`}
                            >
                                {msg.sender === 'bot' && <Bot className="mt-1 text-primary" size={18} />}
                                <div>
                                    {msg.isTyping ? (
                                        <span className="fst-italic text-muted">Escribiendo...</span>
                                    ) : (
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    )}
                                    {!msg.isTyping && (
                                        <small className="text-muted d-block mt-1" style={{ fontSize: '0.7rem' }}>
                                            {msg.timestamp}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center gap-2 border rounded px-3 py-2">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Escribe tu pregunta..."
                        {...register('pregunta')}
                        autoComplete="off"
                        disabled={consultarMutation.isPending}
                    />
                    <button type="submit" className="btn btn-link text-dark p-0" disabled={consultarMutation.isPending}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatIA;
