import React, { useEffect, useState } from "react";
import Mensajes from '../Mensaje/Mensajes';
import { ObtenerMensajes } from "../../Fetching/mensajesFetching";
import './ListaMensajes.css';

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener mensajes una vez al montar el componente
  useEffect(() => {
    const fetchMensajes = async () => {
      console.log("Llamada a ObtenerMensajes");
      try {
        const msgs = await ObtenerMensajes();
        console.log("Mensajes obtenidos:", msgs);
        if (!msgs) {
          throw new Error("Los mensajes obtenidos son undefined");
        }
        setMessages(msgs);
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  console.log("Renderizando mensajes:", messages);

  return (
    <div className="container-msj">
      {messages && messages.map((message, index) => (
        <React.Fragment key={`${message.id}.${index}`}>
          {message.contacto && <h1>Mensajes de {message.contacto.name}</h1>}
          <Mensajes mensaje={message} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListaMensajes;
