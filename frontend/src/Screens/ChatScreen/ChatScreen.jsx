import React, { useState } from "react";
import { MensajeForm, ListaMensajes, ChatHeaderInfo } from '../index.js';
import './ChatScreen.css';

const ChatScreen = () => {
    const [mensajes, setMensajes] = useState([]);

    return (
        <>
            <div className='chat'>
                <ChatHeaderInfo />
                <div className='chat-screen'>
                    <ListaMensajes mensajes={mensajes} />
                </div>
                <MensajeForm setMensajes={setMensajes} />
            </div>
        </>
    );
};

export default ChatScreen;