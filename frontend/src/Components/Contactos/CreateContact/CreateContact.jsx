import React, { useState } from 'react';
import './CreateContact.css';

const CreateContact = ({ onContactCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        text: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null })); // Limpiar errores al modificar el campo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const sessionItem = sessionStorage.getItem('access-token');
            const response = await fetch('http://localhost:3000/api/auth/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(sessionItem).token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.data && result.data.errors) {
                    setErrors(result.data.errors);
                } else {
                    console.error('Error al crear el contacto:', result);
                }
                return;
            }

            setSuccessMessage('¡Contacto creado exitosamente!');
            setFormData({ name: '', email: '', phone: '', text: '' }); // Reiniciar formulario
            onContactCreated && onContactCreated(result.data.contactResult);
        } catch (error) {
            console.error('Error al crear el contacto:', error);
        }
    };

    return (
        <div className="create-contact">

            <h2>Crear nuevo contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                        required
                    />
                    {errors.name && <p className="error">{errors.name.join(', ')}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingresa el correo"
                        required
                    />
                    {errors.email && <p className="error">{errors.email.join(', ')}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ingresa el teléfono"
                        required
                    />
                    {errors.phone && <p className="error">{errors.phone.join(', ')}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="text">Nota</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Ingresa una nota (opcional)"
                    />
                </div>

                <button type="submit" className="btn-submit">Crear contacto</button>
            </form>

            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default CreateContact;
