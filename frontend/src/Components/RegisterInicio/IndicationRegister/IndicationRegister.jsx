import React from 'react';
import './IndicationRegister.css'; 

const IndicationRegister = () => {
  return (
    <div className='indication-register'>
      <h1 className='indication-title'>Forma parte de nuestra comunidad</h1>
      <span className='indication-subtitle'>
        Envía mensajes privados a tus amigos y familiares a través de WhatsApp en tu navegador.
      </span>
      <ul className='indication-instructions'>
        <li>1. Registra tus datos.</li>
        <li>2. Se creará tu usuario con tu email y contraseña.</li>
        <li>3. Inicia sesión con los datos correspondientes luego de registrarte.</li>
      </ul>
      <a href='#' className='help-link'>¿Necesitas ayuda para empezar?</a>
    </div>
  );
}

export default IndicationRegister;