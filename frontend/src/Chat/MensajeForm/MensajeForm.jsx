//Importo librerias
import React, { useState } from "react"
import { IoCameraOutline } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
//Importo estilos
import './MensajeForm.css'
const MensajeForm = ({ submitMensaje }) => {
    const [mensaje, setMensaje] = useState('') // Estado inicial vacío
    const handleSubmit = (e) => { // Función que se ejecuta cuando se envia el formulario
        e.preventDefault();
        setMensaje(e.target.nuevomensaje.value);
        submitMensaje(e.target.nuevomensaje.value);
        e.target.reset()
    }
    //Render
    return (
        <form onSubmit={handleSubmit} className="form">
            <BsEmojiSmile className='icons-emoji' />
            <input className='input-mensaje' type='text'  name='nuevomensaje' placeholder='Escribe un mensaje'  />
            <IoCameraOutline className='icons-input' />
            <MdAttachFile className='icons-input' />
            <button type="submit" className='btn-send'><MdSend /></button>
        </form>

    )
}
export default MensajeForm
