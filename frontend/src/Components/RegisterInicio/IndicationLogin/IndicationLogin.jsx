import React from 'react';
import './IndicationLogin.css'; // Importa los estilos

const IndicationLogin = () => {
  return (
    <div className='indication-login'>
      <h1 className='indication-title'>Disfruta WhatsApp</h1>
      <span className='indication-subtitle'>Recomendaciones para mantener tu cuenta segura</span>
      <ul className='indication-instructions'>
        <li>1. Utiliza una contraseña segura.</li>
        <li>2. Cambia tu contraseña con frecuencia.</li>
        <li>3. No compartas tu contraseña con nadie.</li>
        <li>4. Evita pulsar el botón de "recordar" en tus navegadores.</li>
      </ul>
      <img src="./imagenes/compu.png" className="desktop-image" alt="Computadora con WhatsApp" />
    </div>
  );
}

export default IndicationLogin;
