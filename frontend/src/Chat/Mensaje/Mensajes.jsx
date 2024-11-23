import React, { useEffect, useState } from 'react';
//Importo estilos
import './Mensajes.css';
import { ObtenerMensajesById } from '../../Fetching/mensajesFetching';

const Mensajes = ({ contacto }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Fetch mensajes por ID:", contacto.id);
    fetchMensajesById(contacto.id);
  }, [contacto.id]);

  const fetchMensajesById = async (id) => {
    try {
      const messages = await ObtenerMensajesById(id);
      console.log("Mensajes obtenidos por ID:", messages);
      setMessages(prevMensajes => [...prevMensajes, ...messages]);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  //Render
  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>
          <div className="content" style={{ justifyContent: message.destinatario ? 'flex-end' : 'flex-start' }}>
            <div className="mensaje" style={{ backgroundColor: message.destinatario ? '#D9FDD3' : '#FFFFFF' }}>
              <p className="texto">{message.text}</p>
              <div className="content-lower">
                <span className="timeSince">{message.day} {message.hour}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Mensajes;
