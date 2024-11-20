import { useState, useEffect } from 'react';

const useMensajes = (id) => {
    const [mensajes, setMensajes] = useState([]);
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth/users/${id}/messages`);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                const data = await response.json();
                setContacto(data.contacto);
                setMensajes(data.messages || []);
            } catch (error) {
                console.error('Error al cargar los mensajes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMensajes();
        }
    }, [id]);

    return { mensajes, setMensajes, contacto, loading };
};

export default useMensajes;
