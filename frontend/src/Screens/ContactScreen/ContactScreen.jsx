// Importo librerias
import React, { useState } from 'react';
// Importo estilos
import './ContactScreen.css'
// Importo componentes
import ListaContactos from '../../Components/Contactos/ListaContactos/ListaContactos.jsx'
import ContactoFooter from '../../Components/Contactos/ContactoFooter/ContactoFooter.jsx'
import ContactoHeader from '../../Components/Contactos/ContactoHeader/ContactoHeader.jsx';


const ContactScreen = () => {
    // Funcion que cambia el estado
    const [search, setSearch] = useState('');
    // Funcion handleSearchChange que cambia el estado
    const handleSearchChange = (value) => {
        setSearch(value)
    }

    // Render
    return (
        <div className="contact-screens">

            <ContactoHeader search={search} onSearchChange={handleSearchChange} />
            <ListaContactos search={search} />
            <ContactoFooter />

        </div>
    )
}

export default ContactScreen;

/*  Resumen:
 Este componente muestra la pantalla de contactos y permite realizar una búsqueda en la lista de contactos. 
 También utiliza los componentes ContactoHeader, ListaContactos y ContactoFooter para mostrar la interfaz de usuario.
 */
