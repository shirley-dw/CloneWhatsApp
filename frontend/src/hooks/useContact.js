import { useState, useEffect } from 'react';
import { ObtenerContactos } from '../Fetching/contactosFetching';

const useContactos = (id) => {
    const [contacto, setContacto] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const contactos = await ObtenerContactos();
                const contactoEncontrado = contactos.find(contacto => contacto.id === Number(id));
                if (contactoEncontrado) {
                    setContacto(contactoEncontrado);
                }
            } catch (error) {
                console.error('Error al obtener contactos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactos();
    }, [id]);

    return { contacto, loading };
};
export default useContactos;
