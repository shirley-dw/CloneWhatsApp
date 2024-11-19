import React from "react";
import { Link } from "react-router-dom";
import "./Contacto.css";

/* Componente Contacto le paso props a contacto */
const Contacto = ({ id, nombre, thumbnail = '', mensajes = [] }) => {
  const imagenes = thumbnail && thumbnail.startsWith('http') ? thumbnail : `/imagenes/${thumbnail}`;

  const ultimoMensaje = mensajes.length > 0 ? mensajes[mensajes.length - 1] : null;
  const textoUltimoMensaje = ultimoMensaje?.text ?? 'Sin mensajes';
  const horaUltimoMensaje = ultimoMensaje?.hour ?? '';

  // Render
  return (
    <Link className="contact-link" to={`/mensaje/${id}`}>
      <div key={id} className="contact-item">
        <img src={imagenes} alt={nombre} className="img" />
        <div className="dato">
          <p className="name">
            <strong>{nombre}</strong>
          </p>
          <div className="ultimo-mensaje">{textoUltimoMensaje}</div>
        </div>
        <div className="time">{horaUltimoMensaje}</div>
      </div>
    </Link>
  );
};

export default Contacto;
