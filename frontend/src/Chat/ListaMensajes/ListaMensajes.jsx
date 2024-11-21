import React, { useEffect } from "react";
import Mensajes from '../Mensaje/Mensajes';
import useMensajes from "../../hooks/useMensajes";
import './ListaMensajes.css';

const ListaMensajes = ({ id, mensaje }) => {
  const { mensajes, setMensajes, contacto, loading } = useMensajes(id);

  // Nuevo mensaje
  useEffect(() => {
    if (mensaje) {
      setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    }
  }, [mensaje]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-msj">
      {contacto && <h1>Mensajes de {contacto.name}</h1>}
      {mensajes.map((mensaje, index) => (
        <Mensajes mensaje={mensaje} key={`${id}.${mensaje.id}.${index}`} />
      ))}
    </div>
  );
};

export default ListaMensajes;
