import React, { useEffect, useState } from 'react';
import ContactoCard from '../Contacto/ContactoCard.jsx';
import { ObtenerContactos } from '../../../Fetching/contactosFetching';
import './ListaContactos.css';

const ListaContactos = ({ search }) => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchContactos();

        /* if (contactos) {
            const filteredContactos = contactos.filter(contacto =>
                contacto.name.toLowerCase().includes(search.toLowerCase())
            );
            setContactos(filteredContactos);
        } */

    }, []);
    const fetchContactos = async () => {
        try {
            const contactosFetch = await ObtenerContactos();
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
