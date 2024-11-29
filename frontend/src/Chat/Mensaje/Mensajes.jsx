import React, { useEffect } from "react";
import "./Mensajes.css";


const Mensajes = ({ mensaje, isRecievedMessage }) => {

  useEffect(() => {

  }, []);

  return (
    <div className="messages-container">
      <div
        className="content"
        style={{
          justifyContent:
            isRecievedMessage ? "flex-end" : "flex-start",
        }}
      >
        <div
          className="mensaje"
          style={{
            backgroundColor:
              isRecievedMessage ? "#D9FDD3" : "#FFFFFF",
          }}
        >
          <p className="texto">{mensaje?.text || "Sin contenido"}</p>
          <div className="content-lower">
            <span className="timeSince">{mensaje?.hour || "00:00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
