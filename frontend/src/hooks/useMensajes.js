// Importo librerias
import { useState, useEffect } from 'react';
// Importo Fetching
import { ObtenerMensajes } from '../Fetching/mensajesFetching.js';

const useMensajes = (id) => {

    // Defino state inicial
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);
    // Defino la consulta
    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const mensajes = await ObtenerMensajes();
                const dataMensajes = mensajes.find(mensajes => mensajes.id === Number(id));
                setMensajes(dataMensajes);
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMensajes();
    }, [id]);
}
// Retorno la consulta
return { mensajes, loading };


export default useMensajes;