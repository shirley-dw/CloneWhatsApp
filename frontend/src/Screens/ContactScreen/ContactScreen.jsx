import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ListaContactos from "../../Components/Contactos/ListaContactos/ListaContactos.jsx";
import ContactoFooter from "../../Components/Contactos/ContactoFooter/ContactoFooter.jsx";
import ContactoHeader from "../../Components/Contactos/ContactoHeader/ContactoHeader.jsx";
import './ContactScreen.css';
import { ObtenerContactos } from "../../Fetching/contactosFetching.js";

const ContactScreen = () => {
    const [search, setSearch] = useState('');
    const [contactos, setContactos] = useState([]);
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);



    const navigate = useNavigate();

    const handleSearchChange = (value) => {
        setSearch(value);
    };



    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const contactos = await ObtenerContactos();
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
            <div className="separador">
                <ListaContactos search={search} contactos={contactos || []} />
            </div>
            <ContactoFooter />
        </div>
    );
};

export default ContactScreen;
