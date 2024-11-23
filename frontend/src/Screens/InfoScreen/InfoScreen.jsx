/* Importaciones librerias */
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoChevronBackSharp } from "react-icons/io5";
import { FaRegBell, FaRegBookmark } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import { PiLockLaminatedFill } from "react-icons/pi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { MdOutlinePhone, MdOutlineVideocam, MdSearch, MdLock, MdOutlineTimelapse } from "react-icons/md";

/* Hooks */
import { ObtenerContactos } from '../../Fetching/contactosFetching';

/* Estilos */
import './InfoScreen.css';

const InfoScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchContacto = async () => {
      try {
        const contactosFetch = await ObtenerContactos();
        const contacto = contactosFetch.find(c => c.id === id);
        setContacto(contacto);
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacto();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Establece el elemento de la aplicación para el modal (para accesibilidad)
  Modal.setAppElement('#root');

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="info-screen">
      {contacto && (
        <>
          <div className="info-container">
            <div className="info-header">
              <div><IoChevronBackSharp className='back-icon' onClick={goBack} /></div>
              <BsThreeDotsVertical className='back-icon' onClick={openModal} />
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Menu"
              className="modal"
              overlayClassName="overlay"
            >
              <div className="modal-header">
                <h2 className='title'>Menu</h2>
                <button onClick={closeModal} className="close-button">X</button>
              </div>
              <div className='modal-body'></div>
              <p className='subtitle'><BsArrowRightCircleFill className='icons-arrow' />Compartir</p>
              <p className='subtitle'><BsArrowRightCircleFill className='icons-arrow' />Editar</p>
              <p className='subtitle'> <BsArrowRightCircleFill className='icons-arrow' />Ver en libreta de contactos</p>
              <p className='subtitle'> <BsArrowRightCircleFill className='icons-arrow' />Etiquetar chat</p>
              <p className='subtitle'> <BsArrowRightCircleFill className='icons-arrow' />Dispositivos vinculados </p>
              <p className='subtitle'><BsArrowRightCircleFill className='icons-arrow' />Verificar codigo de seguridad</p>
            </Modal>
            <div className='info'>
              <img className="profile" src={'/imagenes/' + contacto.thumbnail} alt="Foto perfil" />
              <h1 className="profile-name">{contacto.nombre}</h1>
              <p className='status-text'>Última conexión: {contacto.ultima_conexion}</p>
            </div>
            <div className="options">
              <div className="icon-container"><MdOutlinePhone className="opciones-icons" /></div>
              <div className="icon-container"><MdOutlineVideocam className="opciones-icons" /></div>
              <div className="icon-container"><MdSearch className="opciones-icons" /></div>
            </div>
            <div className="deco">
              <div className="avanced"><FaRegBell className="iconos" /><p>Notificaciones</p></div>
              <div className="avanced"><AiOutlinePicture className="iconos" /><p>Visibilidad de archivos multimedia<span className="sub">Desactivada</span></p></div>
              <div className="avanced"><FaRegBookmark className="iconos" /><p>Mensajes conservados</p></div>
              <div className="avanced"><MdLock className="iconos" /><p>Cifrado<span>Los mensajes y las llamadas están cifrados de extremo a extremo. Toca para verificarlo</span></p></div>
              <div className="avanced"><MdOutlineTimelapse className="iconos" /><p>Mensajes temporales <span>90 dias</span></p></div>
              <div className="avanced"><PiLockLaminatedFill className="iconos" /><p>Restringir chat<span>Restringe y oculta este chat en este dispositivo</span></p> </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoScreen;
