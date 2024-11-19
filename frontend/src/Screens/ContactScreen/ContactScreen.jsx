import React, { useState, useEffect } from "react";
import ListaContactos from "../../Components/Contactos/ListaContactos/ListaContactos.jsx";
import ContactoFooter from "../../Components/Contactos/ContactoFooter/ContactoFooter.jsx";
import ContactoHeader from "../../Components/Contactos/ContactoHeader/ContactoHeader.jsx";

const ContactScreen = () => {
    const [search, setSearch] = useState('');
    const [contactos, setContactos] = useState([]);

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/contacts'); 
                if (!response.ok) {
                    throw new Error('Error al obtener los contactos');
                }
                const data = await response.json();
                console.log('Contactos recibidos:', data);
                
                // Extrae la matriz de contactos
                const contactos = data.data.contacts;
                setContactos(contactos);
            } catch (error) {
                console.error('Error al obtener los contactos:', error);
            }
        };

        fetchContactos();
    }, []);

    return (
        <div className="contact-screens">
            <ContactoHeader search={search} onSearchChange={handleSearchChange} />
            <ListaContactos search={search} contactos={contactos} />
            <ContactoFooter />
        </div>
    );
};

export default ContactScreen;
