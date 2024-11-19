import React, { useState, useEffect } from "react";
import Contacto from "../../Contactos/Contacto/Contacto.jsx";
import "./ListaContactos.css";

const ListaContactos = ({ search, contactos }) => {
  const [contactosFiltrados, setContactosFiltrados] = useState([]);

  useEffect(() => {
    console.log('Contactos recibidos en ListaContactos:', contactos); 
    if (search) {
      setContactosFiltrados(
        contactos.filter((contacto) =>
          contacto.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setContactosFiltrados(contactos);
    }
    console.log('Contactos filtrados:', contactosFiltrados); 
  }, [contactos, search]);

  return (
    <div className="contact-list">
      {contactosFiltrados.map(({ _id, name, thumbnail, mensajes }) => (
        <Contacto
          id={_id}
          key={_id} 
          nombre={name}
          thumbnail={thumbnail}
          mensajes={mensajes}
        />
      ))}
    </div>
  );
};

export default ListaContactos;
