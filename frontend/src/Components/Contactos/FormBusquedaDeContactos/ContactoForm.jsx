// Importo librerias
import React from 'react';

import { MdArrowForwardIos } from "react-icons/md";
// Importo estilos
import './ContactoForm.css';

function FormBusquedaDeContactos({ search, onSearchChange, onBackButtonClick }) {
  // Funcion que cambia el estado
  const handleChange = (event) => {
    if (typeof onSearchChange === 'function') {
      onSearchChange(event.target.value)
      event.preventDefault()
    } else {
      console.error('onSearchChange no es una función');
    }

    if (typeof onBackButtonClick === 'function') {
      onBackButtonClick();
    }
  }
  // Render
  return (

    <form className="form-search">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleChange}
        value={search}
        className='input-search'
      />
      <button><MdArrowForwardIos className='back' onClick={onBackButtonClick} /></button>
    </form>
  );
}

export default FormBusquedaDeContactos;