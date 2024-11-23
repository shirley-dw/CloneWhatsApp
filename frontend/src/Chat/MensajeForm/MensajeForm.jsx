import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import './MensajeForm.css';

const MensajeForm = ({ setMensajes }) => {
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msjNuevo = {
            author: 'yo',
            text: mensaje,
            estado: 'visto',
            day: 'hoy',
            hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        try {
            // Hacer la llamada a la API para guardar el mensaje
            const response = await fetch('http://localhost:3000/api/auth/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(msjNuevo),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el mensaje');
            }
            console.log(msjNuevo);
            const savedMessage = await response.json();
            console.log("Mensaje guardado:", savedMessage);
            setMensajes(prevMensajes => [...prevMensajes, savedMessage]); // Actualiza el estado de mensajes
            setMensaje(''); // Resetea el input 
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <BsEmojiSmile className='icons-emoji' />
            <input
                className='input-mensaje'
                type='text'
                name='nuevomensaje'
                placeholder='Escribe un mensaje'
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)} // Actualiza el estado del mensaje
                required={true}
            />
            <IoCameraOutline className='icons-input' />
            <MdAttachFile className='icons-input' />
            <button type="submit" className='btn-send'><MdSend /></button>
        </form>
    );
};

export default MensajeForm;