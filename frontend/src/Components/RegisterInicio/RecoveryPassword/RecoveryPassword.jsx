import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecoveryPassword.css'; // Importa el archivo CSS

const RecoveryPassword = () => {
    const { reset_token } = useParams();
    const [formState, setFormState] = useState({
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleRecoveryPassword = async (event) => {
        event.preventDefault();
        if (formState.password !== formState.confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/auth/reset-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reset_token, password: formState.password })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMessage(data.message);
            // Redireccionar a la URL proporcionada
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setMessage('Error al restablecer la contraseña');
        }
    };
    
    return (
        <div className="recovery-container">
            <form onSubmit={handleRecoveryPassword} className="recovery-form">
        
            <h2 className="recovery-title">Recuperar Contraseña</h2>
                <div className="form-group">
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {message && <p className="error">{message}</p>}
                <button type="submit">Restablecer Contraseña</button>
            </form>
            <Link to="/login">Iniciar Sesión</Link>
        </div>
    );
};

export default RecoveryPassword;
