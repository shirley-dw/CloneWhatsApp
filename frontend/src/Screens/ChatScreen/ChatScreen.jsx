import React, { useState } from "react";
// Importo componentes
import { MensajeForm, ListaMensajes, ChatHeaderInfo } from '../index.js';
// Importo estilos
import './ChatScreen.css';

const ChatScreen = () => {
    const [mensajes, setMensajes] = useState([]);
    const authorId = '601c3c8f7c2134b8c1d4f4ab'; // Reemplaza con el ObjectId real del autor

    return (
        <>
            <div className='chat'>
                <ChatHeaderInfo />
                <div className='chat-screen'>
                    <ListaMensajes mensajes={mensajes} />
                </div>
                <MensajeForm setMensajes={setMensajes} authorId={authorId} />
            </div>
        </>
    );
};

export default ChatScreen;
