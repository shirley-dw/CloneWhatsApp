// Importo librerías
import React, { useState } from 'react';
import Modal from 'react-modal';
import { BsFillChatLeftTextFill, BsTelephone } from "react-icons/bs";
import { RiChatSmile3Line } from "react-icons/ri";
import { LiaToolsSolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import { MdCallReceived } from "react-icons/md";


// Estilos
import './ContactoFooter.css';

const ContactoFooter = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado inicial en false
    // Función que abre el modal    
    const openModal = () => {
        setModalIsOpen(true);
    };
    // Función que cierra el modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Establece el elemento de la aplicación para el modal (para accesibilidad)
    Modal.setAppElement('#root');
    // Render
    return (
        <div className="contact-footer">
            <div className="access"><BsFillChatLeftTextFill className='icons' /><p>Dialogos</p></div>
            <div className="access" onClick={openModal}>
                <BsTelephone className='icons' /><p>Llamadas</p>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Llamadas"
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-header">
                    <h2 className='title'>Llamadas</h2>
                    <button onClick={closeModal} className="close-button">X</button>
                </div>
                <div className="modal-body">
                    <p className='subtitle'>Recientes</p>
                    <p className='name'><MdCallReceived className='icons-arrow' />Homero Simpson<IoCallOutline className='icons-call' /></p>
                    <p className='text'>Ayer, 16:29 </p>
                    <p className='name'><MdCallReceived className='icons-arrow' /> Marge Bouvier Simpson<IoCallOutline className='icons-call' /></p>
                    <p className='text'>Ayer, 18:30 </p>
                    <p className='name'><MdCallReceived className='icons-arrow' />Krusty el payaso <IoCallOutline className='icons-call' /> </p>
                    <p className='text'>Ayer, 20:00</p>
                </div>
            </Modal>
            <div className="access"><RiChatSmile3Line className='icons' /><p>Anuncios</p></div>
            <div className="access"><LiaToolsSolid className='icons' /><p>Herramientas</p></div>
        </div>
    );
};

export default ContactoFooter;