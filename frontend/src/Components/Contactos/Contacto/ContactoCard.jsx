import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Contacto.css";
import { actualizarContacto, eliminarContacto } from "../../../Fetching/contactosFetching.js";

const ContactoCard = ({ id, name, thumbnail, status, text = "Sin mensajes", hour = "", onSelect }) => {
    const defaultImage = '/imagenes/user.png'; // Ruta de la imagen por defecto
    const imagenes = thumbnail && thumbnail.startsWith("http") ? thumbnail : (thumbnail ? `/imagenes/${thumbnail}` : defaultImage);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newName, setNewName] = useState(name); // Para actualizar el nombre
    const navigate = useNavigate();

    const openModal = (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    // Maneja la actualización del contacto
    const handleActualizarContacto = async (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        try {
            const updatedContact = await actualizarContacto(id, { name: newName });
            console.log("Contacto actualizado:", updatedContact);
            alert("Contacto actualizado correctamente.");
            closeModal();
        } catch (error) {
            alert("Error al actualizar el contacto.");
        }
    };

    // Maneja la eliminación del contacto
    const handleEliminarContacto = async (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        try {
            await eliminarContacto(id);
            console.log("Contacto eliminado correctamente.");
            alert("Contacto eliminado correctamente.");
            closeModal();
        } catch (error) {
            alert("Error al eliminar el contacto.");
        }
    };

    // Navegar al contacto seleccionado
    const handleSelectContacto = (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        if (onSelect) {
            onSelect(id);
        } else {
            navigate(`/mensaje/${id}`, { state: { id, name, thumbnail, status, text, hour } });
        }
    };

    return (
        <div className="contacto" onClick={handleSelectContacto}>
            <div key={id} className="contact-item">
                <img src={imagenes} alt={name} className="img" />
                <div className="dato">
                    <p className="name-card">
                        {name}
                    </p>
                    <div className="ultimo-mensaje">{text}</div>
                    <div className="status">{status}</div>
                </div>
                <div className="time">{hour}</div>
            </div>
            <BsThreeDotsVertical
                className="options-icon"
                onClick={openModal} // Abrir el modal sin interferir con el contenedor
            />

            {/* Modal para opciones */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Opciones de contacto"
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <h2>Opciones de contacto</h2>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label htmlFor="newName">Cambiar nombre:</label>
                        <input
                            type="text"
                            id="newName"
                            value={newName}
                            onChange={(e) => {
                                e.stopPropagation();
                                setNewName(e.target.value);
                            }}
                            placeholder="Nuevo nombre"
                        />
                    </div>
                    <button onClick={handleActualizarContacto} className="btn-update">
                        Actualizar Contacto
                    </button>
                    <button onClick={handleEliminarContacto} className="btn-delete">
                        Eliminar Contacto
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closeModal(); }} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ContactoCard;
