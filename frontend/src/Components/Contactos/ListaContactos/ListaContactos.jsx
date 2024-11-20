import React, { useState, useEffect } from "react";
import Contacto from "../../Contactos/Contacto/Contacto.jsx";
import "./ListaContactos.css";

const ListaContactos = ({ search, contactos, onSelectContacto }) => {
  const [contactosFiltrados, setContactosFiltrados] = useState([]);

  useEffect(() => {
    if (search) {
      setContactosFiltrados(
        contactos.filter(contacto =>
          contacto.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setContactosFiltrados(contactos);
    }
  }, [contactos, search]);

  return (
    <div className="contact-list">
      {contactosFiltrados.map(({ _id, name, thumbnail, mensajes = [] }) => {
        const ultimoMensaje = mensajes.length > 0 ? mensajes[mensajes.length - 1] : { text: "Sin Mensajes", hour: "" };

        return (
          <Contacto
            id={_id}
            key={_id}
            nombre={name}
            thumbnail={thumbnail}
            textoUltimoMensaje={ultimoMensaje.text}
            horaUltimoMensaje={ultimoMensaje.hour}
            onSelect={() => onSelectContacto(_id)}
          />
        );
      })}
    </div>
  );
};

export default ListaContactos;
