import React, { useEffect, useState } from "react";
import Mensajes from '../Mensaje/Mensajes';
import { ObtenerMensajes } from "../../Fetching/mensajesFetching";
import './ListaMensajes.css';

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Nuevo mensaje
  useEffect(() => {
    if (messages.length > 0) {
      ObtenerMensajes().then(setMessages);
    }

  }, [messages]);

  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="container-msj">
      {messages.map((message, index) => (
        <>
          {message.contacto && <h1>Mensajes de {message.contacto.name}</h1>}
          <Mensajes mensaje={message} key={`${message.id}.${index}`} />
        </>
      ))}
    </div>
  );
};

export default ListaMensajes;
