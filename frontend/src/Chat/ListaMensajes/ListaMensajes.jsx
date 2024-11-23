import React, { useEffect, useState } from "react";
import Mensajes from '../Mensaje/Mensajes';
import { ObtenerMensajes } from "../../Fetching/mensajesFetching";
import './ListaMensajes.css';

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMensajes = async () => {
      console.log("Llamada a ObtenerMensajes");
      try {
        const msgs = await ObtenerMensajes();

        // Verificación adicional de los datos obtenidos
        console.log("Respuesta cruda de la API:", msgs);

        if (!msgs || !Array.isArray(msgs)) {
          throw new Error("Los mensajes obtenidos son undefined o no son un array");
        }

        console.log("Mensajes obtenidos:", msgs);
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
      {messages.length === 0 ? (
        <div>No hay mensajes para mostrar.</div>
      ) : (
        messages.map((message, index) => (
          <React.Fragment key={`${message._id}.${index}`}>

            <Mensajes contacto={message.author} />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default ListaMensajes;
