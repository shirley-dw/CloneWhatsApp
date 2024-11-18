//Importo librerias
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  Mensajes  from '../Mensaje/Mensajes';
//Importo estilos
import './ListaMensajes.css'

const ListaMensajes = ({ mensaje }) => {
  const { id } = useParams()
  const [mensajeInicial, setMensajeInicial] = useState([])
  const [contacto, setContacto] = useState();
// Fetching
  useEffect(() => {
    fetch("/mensajeria.json")
      .then((response) => response.json())
      .then((data) => {
        const contactoEncontrado = data.find(
          (contacto) => contacto.id === Number(id)
        );
        if (contactoEncontrado) {
          setContacto(contactoEncontrado);
          setMensajeInicial(contactoEncontrado.mensajes);
        }
      });
  }, [id]);

//New message
  useEffect(() => {
    if (mensaje) {
      setMensajeInicial((mensajesPrevios) => [...mensajesPrevios, mensaje]);
    }
  }, [mensaje]);

//Render
  return (
    <div className="container-msj">
      {mensajeInicial.map((mensaje, index) => (
         <Mensajes mensaje={mensaje} key={`${id}.${mensaje.id}.${index}`}/>
        ))}
        </div>
)
}
export default ListaMensajes;


