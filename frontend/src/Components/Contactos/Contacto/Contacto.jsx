import React from "react";
import "./Contacto.css";

const Contacto = ({ id, nombre, thumbnail, status = '', textoUltimoMensaje = 'Sin mensajes', horaUltimoMensaje = '', onSelect }) => {
  const imagenes = thumbnail && thumbnail.startsWith('http') ? thumbnail : `/imagenes/${thumbnail}`;

  return (
    <div className="contact-link" onClick={onSelect}>
      <div key={id} className="contact-item">
        <img src={imagenes} alt={nombre} className="img" />
        <div className="dato">
          <p className="name">
            <strong>{nombre}</strong>
          </p>
          <div className="ultimo-mensaje">{textoUltimoMensaje}</div>
          <div className="status">{status}</div>
        </div>
        <div className="time">{horaUltimoMensaje}</div>
      </div>
    </div>
  );
};

export default Contacto;
