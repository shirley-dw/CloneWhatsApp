import React, { useEffect, useState } from 'react';
import ContactoCard from '../Contacto/ContactoCard.jsx';
import { ObtenerContactosByUserId } from '../../../Fetching/contactosFetching';
import './ListaContactos.css';

const ListaContactos = ({ search }) => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchContactos();
    }, [contactos]);
    const fetchContactos = async () => {
        const sessionItem = sessionStorage.getItem('access-token');
        const id = JSON.parse(sessionItem).id;
        try {
            const contactosFetch = await ObtenerContactosByUserId(id);
            setContactos(contactosFetch);
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <div>Cargando...</div>}
            {contactos && contactos.map(contacto => (
                <ContactoCard
                    key={contacto._id}
                    id={contacto._id}
                    name={contacto.name}
                    thumbnail={contacto.thumbnail}
                    status={contacto.status}
                    text={contacto.text}
                    hour={contacto.hour}
                />
            ))}

        </div>
    );
};

export default ListaContactos;
