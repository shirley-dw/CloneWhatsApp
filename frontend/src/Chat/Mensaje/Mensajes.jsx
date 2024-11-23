import React, { useEffect, useState } from 'react';
import './Mensajes.css';
import { ObtenerMensajesById } from '../../Fetching/mensajesFetching';

const Mensajes = ({ contacto }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (contacto) {
      console.log("Fetch mensajes por ID:", contacto);
      fetchMensajesById(contacto._id);
    } else {
      console.error("Contacto o ID no válido:", contacto);
      setLoading(false);
    }
  }, [contacto]);

  const fetchMensajesById = async (id) => {
    try {
      const fetchedMessages = await ObtenerMensajesById(id);

      if (!fetchedMessages || fetchedMessages.length === 0) {
        throw new Error('Los mensajes obtenidos son undefined o vacíos');
      }

      console.log("Mensajes obtenidos por ID:", fetchedMessages);
      setMessages(fetchedMessages); // Actualizar mensajes directamente 
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (messages.length === 0) {
    return <div>No hay mensajes para mostrar.</div>;
  }

  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>
          <div className="content" style={{ justifyContent: message.destinatario ? 'flex-end' : 'flex-start' }}>
            <div className="mensaje" style={{ backgroundColor: message.destinatario ? '#D9FDD3' : '#FFFFFF' }}>
              <p className="texto">{message.text}</p>
              <div className="content-lower">
                <span className="timeSince">{message.hour} <style>{message.destinatario ? 'Enviado' : 'Recibido'}</style></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Mensajes;