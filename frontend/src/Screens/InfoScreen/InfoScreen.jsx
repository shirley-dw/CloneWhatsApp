/* Importaciones librerias */
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IoChevronBackSharp } from "react-icons/io5";
import InfoContact from './InfoContact/InfoContact.jsx';
import HeaderRegister from '../../Components/RegisterInicio/HeaderRegister/HeaderRegister.jsx';
/* Hooks */
import { ObtenerContactos } from '../../Fetching/contactosFetching';

/* Estilos */
import './InfoScreen.css';

const InfoScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="info-screen">
      <HeaderRegister />
      {contacto && (
        <>
          <div className="info-content">
            <div><IoChevronBackSharp className='back-icon' onClick={goBack} /></div>
            <div className='info-del-contact'>
              <div className='contacto-info'>
                <img className="profile-info" src={'/imagenes/profile.jpg'} alt="Foto perfil" />
                <h2>{contacto.name}</h2>
                <p>{contacto.email}</p>
              </div>
            </div>
            <InfoContact contacto={contacto} />
          </div>
        </>
      )}
    </div>
  );
};

export default InfoScreen;

