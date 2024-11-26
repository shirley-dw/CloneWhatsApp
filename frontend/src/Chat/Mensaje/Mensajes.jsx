import React, { useEffect, useState } from "react";
import "./Mensajes.css";
import { ObtenerMensajesById } from "../../Fetching/mensajesFetching";

const Mensajes = ({ contacto }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMensajesById = async () => {
      try {
        if (contacto?.id) {
          const fetchedMessages = await ObtenerMensajesById(contacto.id);

          if (Array.isArray(fetchedMessages)) {
            setMessages(fetchedMessages);
          } else {
            console.warn("Formato de datos inesperado:", fetchedMessages);
          }
        } else {
          console.error("Contacto no válido o ID indefinido:", contacto);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMensajesById();

    return () => setMessages([]);
  }, [contacto]);

  if (loading) return <div className="loading">Cargando mensajes...</div>;

  if (!messages?.length)
    return <div className="no-messages">No hay mensajes para mostrar.</div>;

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className="content"
          style={{
            justifyContent:
              message?.author?._id === contacto?._id ? "flex-end" : "flex-start",
          }}
        >
          <div
            className="mensaje"
            style={{
              backgroundColor:
                message?.author?._id === contacto?._id ? "#D9FDD3" : "#FFFFFF",
            }}
          >
            <p className="texto">{message?.text || "Sin contenido"}</p>
            <div className="content-lower">
              <span className="timeSince">{message?.hour || "00:00"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mensajes;
