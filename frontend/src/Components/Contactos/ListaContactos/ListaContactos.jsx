// Importo librerías
import React, { useState, useEffect } from "react";
// Importo componentes
import Contacto from "../../Contactos/Contacto/Contacto.jsx";
// Fetching
import { ObtenerContactos } from '../../../Fetching/contactosFetching.js';
// Estilos
import "./ListaContactos.css";


const ListaContactos = ({ search }) => {
  const [contactos, setContactos] = useState([]);
  const [contactosFiltrados, setContactosFiltrados] = useState([]);

  // Fetching
  useEffect(() => {
    ObtenerContactos()
      .then((contactos) => {
        contactos.forEach((contacto) => {
          const ultimoMensaje = contacto.mensajes[contacto.mensajes.length - 1];
          contacto.ultimoMensaje = ultimoMensaje;
        });
        setContactos(contactos);
      })
      .catch((error) => {
        console.error("Error al obtener contactos:", error);
      });
  }, []);

  useEffect(() => {
    if (search) {
      setContactosFiltrados(
        contactos.filter((contacto) =>
          contacto.nombre?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setContactosFiltrados(contactos);
    }
  }, [contactos, search]);

  // Render
  return (
    <div className="contact-list">
      {contactosFiltrados.map(({ id, nombre, thumbnail, mensajes }) => (
        <Contacto
          id={id}
          key={id}
          nombre={nombre}
          thumbnail={thumbnail}
          mensajes={mensajes}
        />
      ))}

    </div>
  );
}
export default ListaContactos;





/* 
.then((contactos) => {... }): Cuando la promesa devuelta por ObtenerContactos() se resuelve, se ejecuta la función  que se pasa como argumento a .then (RECIBE LA LISTA DE CONTACTOS COMO PARAMETRO CONTACTOS). 
· La función actualiza el estado contactos con la lista de contactos recibida utilizando setContactos(contactos).

---------------------------------------------------------------------------------------------------------------------------------------------------
.catch: Se utiliza para capturar y manejar errores que ocurran durante la ejecución de la promesa devuelta por ObtenerContactos(). Si ocurre un error, se muestra un mensaje de error en consola.
---------------------------------------------------------------------------------------------------------------------------------------------------

contacto.nombre?.toLowerCase().includes(search.toLowerCase()): Es la condicion de filtrado verifica si el nombre del contacto (conv' a minusc') contiene la cadena de busqueda search (conv' a minusc'). El operador ?. se usa para evitar errores de tipo "null" en caso de que el contacto no tenga un nombre.

setContactosFiltrados(contactos): Actualiza el estado contactosFiltrados con la lista de contactos filtrada.

*/