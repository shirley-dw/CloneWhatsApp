import React from 'react';
import './Mensajes.css';

const Mensajes = ({ mensaje }) => {
  const { author, text, status, day, hour } = mensaje;
  const isAuthor = author === 'yo';

  // Render
  return (
    <div className="content" style={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start' }}>
      <div className="mensaje" style={{ backgroundColor: isAuthor ? '#D9FDD3' : '#FFFFFF' }}>
        <p className="texto">{text}</p>
        <div className="content-lower">
          <span className="timeSince">{`${day} ${hour}`}</span>
          <span className="timeSince">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;

