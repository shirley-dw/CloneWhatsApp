import React from 'react';
import Contacto from '../Contacto/Contacto.jsx';
import './ListaContactos.css';

const ListaContactos = ({ search, contactos, onSelectContacto }) => {
    if (!contactos || contactos.length === 0) {
        return <p>No se encontraron contactos</p>;
    }

    const filteredContactos = contactos.filter(contacto => 
        contacto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {filteredContactos.map(contacto => (
                <Contacto 
                    key={contacto._id}
                    id={contacto._id}
                    nombre={contacto.name}
                    thumbnail={contacto.thumbnail}
                    status={contacto.status}
                    lastMessage={contacto.lastMessage}
                    horaUltimoMensaje={contacto.horaUltimoMensaje}
                    onSelect={onSelectContacto}
                />
            ))}
        </div>
    );
};

export default ListaContactos;
