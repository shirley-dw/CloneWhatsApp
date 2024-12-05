import React from 'react';
import { IoAdd } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import Modal from 'react-modal';

import useModal from '../../../hooks/useModal';
import './ContactoHeader.css';
import CreateContact from '../CreateContact/CreateContact';

const ContactoHeader = ({ search, onSearchChange, onContactUpdated }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="contact-header">
      <SiWhatsapp className='logo-icons' />
      <div className='logo'>WhatsApp</div>
      <div className='icons'>
        <button className='btn-agendar' onClick={openModal}>
          <img src="./imagenes/agregar-usuario.png" alt="" className='add-user' /> Agendar
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar contacto"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <button onClick={closeModal} className="close-button">X</button>
        </div>
        <CreateContact
          onContactCreated={() => {
            closeModal();
            onContactUpdated(); // Llama a la función de actualización
          }}
        />
      </Modal>
    </div>
  );
};

export default ContactoHeader;
