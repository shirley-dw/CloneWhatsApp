import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiWhatsapp } from "react-icons/si";
import './VerifyEmail.css';

const VerifyEmail = () => {
    const { validation_token } = useParams();
    const [message, setMessage] = useState('Verificando tu email...');
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth/verify-email/${validation_token}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    setMessage('¡Email verificado exitosamente!');
                    setIsVerified(true);
                } else {
                    setMessage('Hubo un problema al verificar tu email.');
                    setIsVerified(false);
                }
            } catch (error) {
                console.error('Error al verificar el email:', error);
                setMessage('Hubo un error al verificar tu email.');
                setIsVerified(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className='verify-email-container'>
            <div className='verification-header'>
                <SiWhatsapp className='logo-icons' />
                <h1 className='header-title'>WhatsApp Web</h1>
            </div>

            <div className='verify-email-content'>
                <h1>{message}</h1>
                {isVerified === true && (
                    <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
                )}
                {isVerified === false && (
                    <p>Hubo un problema al verificar tu correo, vuelve a intentarlo.</p>

                )}
                <Link to="/register" className="btn-secondary">Registrarme nuevamente</Link>
            </div>
        </div>
    );
};

export default VerifyEmail;