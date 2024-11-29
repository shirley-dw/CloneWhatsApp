// Importo librerías
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoAdd } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import Modal from 'react-modal';

// Estilos
import './ContactoHeader.css';

// Importo componentes
import CreateContact from '../CreateContact/CreateContact.jsx'; // Importa el componente CreateContact
import FormBusquedaDeContactos from '../FormBusquedaDeContactos/ContactoForm.jsx';

const ContactoHeader = ({ search, onSearchChange }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Función que abre el modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Función que cierra el modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Función que alterna la búsqueda
  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className={`contact-header ${searchVisible ? 'search-visible' : ''}`}>
      {searchVisible && (
        <FormBusquedaDeContactos
          search={search}
          onSearchChange={onSearchChange}
        />
      )}
      <SiWhatsapp className='logo-icons' />
      <div className='logo'>WhatsApp</div>
      <div className='icons'>
        <IoAdd className='icons' onClick={openModal} />
        <BsThreeDotsVertical className='icons' onClick={handleSearchClick} />
      </div>

      {/* Modal para agregar contacto */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar contacto"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false} // Permite que el modal funcione sin advertencias en desarrollo
      >
        <div className="modal-header">
          <button onClick={closeModal} className="close-button">X</button>
        </div>
        {/* Incluye el componente CreateContact en el modal */}
        <CreateContact

          onContactCreated={(newContact) => {
            closeModal(); // Cierra el modal después de agregar un contacto
          }}
        />
      </Modal>
    </div>
  );
};

export default ContactoHeader;
