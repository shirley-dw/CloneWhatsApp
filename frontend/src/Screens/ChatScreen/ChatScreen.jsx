import React, { useState } from "react";
// Importo componentes
import { MensajeForm, ListaMensajes, ChatHeaderInfo } from '../index.js';
// Importo estilos
import './ChatScreen.css';

const ChatScreen = () => {
    // Defino estado inicial de los mensajes
    const [mensajes, setMensajes] = useState([]);

    // Función addMensaje para agregar un nuevo mensaje
    const addMensaje = (mensajeNuevo) => {
        const msjNuevo = {
            author: 'yo',
            text: mensajeNuevo,
            estado: 'visto',
            day: 'hoy',
            hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            id: mensajes.length + 1

        };
        setMensajes([...mensajes, msjNuevo]);
    };

    // Render
    return (
        <>

            <div className='chat'>
                <ChatHeaderInfo />
                <div className='chat-screen'>
                    <ListaMensajes mensajes={mensajes} />

                </div>
                <MensajeForm submitMensaje={addMensaje} />

            </div>
        </>
    );
};

export default ChatScreen;
