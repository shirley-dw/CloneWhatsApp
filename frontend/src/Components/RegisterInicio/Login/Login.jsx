import { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import IndicationLogin from '../IndicationLogin/IndicationLogin';
import './Login.css';

const Login = () => {
    const { formState, handleChange } = useForm({
        email: '',
        password: ''
    });

    const [errorsState, setErrorsState] = useState({
        email: '',
        password: '',
        general: ''
    });

    const navigate = useNavigate(); // Hook para manejar la redirección

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const responseHTTP = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            const data = await responseHTTP.json();

            if (!data.ok) {
                if (data.errors) {
                    setErrorsState((prevState) => ({
                        ...prevState,
                        ...data.errors
                    }));
                } else {
                    setErrorsState((prevState) => ({
                        ...prevState,
                        general: data.message || 'Error desconocido al iniciar sesión'
                    }));
                }
            } else {
                console.log('Inicio de sesión exitoso');
                sessionStorage.setItem('access-token', JSON.stringify({ token: data.data.token, userId: data.data.userId }));  // Agrego manejo de sessionStorage 
                navigate('/inicio'); // Redirige a ContactScreen después del inicio de sesión exitoso
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorsState((prevState) => ({
                ...prevState,
                general: 'Error de conexión. Inténtalo de nuevo más tarde.'
            }));
        }
    };

    return (
        <div className='login-container'>
            <HeaderRegister />
            <div className='login-content'>
                <div className='indication-login-container'>
                    <IndicationLogin />
                </div>
                <form onSubmit={handleLogin} className='login-form'>
                    <h1 className='login-title'>Inicia sesión</h1>
                    <div className='form-group'>
                        <label className='login-label' htmlFor='email'>Ingresa tu email:</label>
                        <input
                            name='email'
                            id='email'
                            placeholder='tuemail@gmail.com'
                            type='email'
                            onChange={handleChange}
                            value={formState.email}
                            className='login-input'
                        />
                        {errorsState.email && <span className='error'>{errorsState.email}</span>}
                    </div>
                    <div className='form-group'>
                        <label className='login-label' htmlFor='password'>Ingresa tu contraseña:</label>
                        <input
                            name='password'
                            id='password'
                            placeholder='*********'
                            type='password'
                            onChange={handleChange}
                            value={formState.password}
                            className='login-input'
                        />
                        {errorsState.password && <span className='error'>{errorsState.password}</span>}
                    </div>
                    <button type='submit' className='login-button'>Iniciar sesión</button>
                    {errorsState.general && <div className='error'>{errorsState.general}</div>}

                    <Link to='/forgot-password' className='forgot-password-link'>Olvidé mi contraseña</Link>
                    <div className='register-div'>
                        <span className='register-span'>¿No tienes una cuenta?</span>
                        <Link to='/register' className='register-link'>Registrate aqui</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
