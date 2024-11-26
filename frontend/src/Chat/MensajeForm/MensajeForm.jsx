import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import './MensajeForm.css';
import { isValidObjectId } from '../../utils/validate.id.js';
// Función para validar si un ObjectId es válido


const MensajeForm = ({ setMensajes }) => {
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authorId = localStorage.getItem('userId'); // Obtén el ID del autor desde el localStorage
        // Validación de los IDs antes de enviar
        if (!isValidObjectId(authorId)) {
            console.error("El ID del autor no es válido.");
            return;
        }

        if (!isValidObjectId(destinatarioId)) {
            console.error("El ID del destinatario no es válido.");
            return;
        }

        const msjNuevo = {
            author: authorId,
            text: mensaje,
            status: 'visto',
            day: new Date().toLocaleDateString(),
            hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            destinatario: destinatarioId,
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de que el token esté presente
                },
                body: JSON.stringify(msjNuevo),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el mensaje');
            }

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
