import { useState, useEffect } from 'react';
import { ObtenerMensajes } from '../Fetching/mensajesFetching';

const useMensajes = () => {
    const [mensajes, setMensajes] = useState([]);
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const mensajes = await ObtenerMensajes();
                setMensajes(mensajes);
            } catch (error) {
                console.error('Error al obtener los mensajes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMensajes();
    }, []);

    return { mensajes, setMensajes, contacto, setContacto, loading };
};

export default useMensajes;