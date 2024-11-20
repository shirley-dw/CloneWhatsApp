import { useState, useEffect } from 'react';

const useContactos = (id) => {
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacto = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth/contacts/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el contacto');
                }
                const data = await response.json();
                setContacto(data);
            } catch (error) {
                console.error("Error al obtener el contacto:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchContacto();
        }
    }, [id]);

    return { contacto, loading };
};

export default useContactos;
