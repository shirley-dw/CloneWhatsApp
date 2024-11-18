//Importo libreria
import React, { useState} from "react";
// Importo componenetes
import { ChatHeaderInfo, ListaMensajes, MensajeForm, InfoScreen } from '../index.js' /* Importa tres componentes desde el archivo */
// Importo estilos
import './ChatScreen.css' /* Importa el arhivo ChatScreen.css */

const ChatScreen = ({ contactoID }) => {
    //Defino estado inicial de los mensajes
    const [mensajes, setMensajes] = useState([]); 
// Funcion addMensajes para agregar un nuevo mensaje
    const addMensaje = (mensajeNuevo) => {
        const msjNuevo = {
            author: 'yo',
            text: mensajeNuevo,
            estado: 'visto',
            day: 'hoy',
            hour: '11:18',
            id: mensajes.length + 1
        }
        setMensajes([...mensajes, msjNuevo]);
    }
    // Render
    return (
        <>
            <ChatHeaderInfo />
            <div>
                <div className='chat'> 
                    <div className='chat-screen'>
                        <ListaMensajes contactoID={contactoID} mensaje={mensajes[mensajes.length - 1]}  />
                    </div>
                    <MensajeForm submitMensaje={addMensaje} /> 
                    <InfoScreen contactoID={contactoID} />
                </div>
            </div>
        </>
    )
}
export default ChatScreen
/* Resumen:  El componente ChatScreen define una pantalla de chat que muestra un encabezado, una lista de mensajes 
    y un formulario para enviar nuevos mensajes.
   El estado mensajes se utiliza para almacenar la lista de mensajes y se actualiza cuando se agrega un nuevo mensaje. */

