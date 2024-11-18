import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/RegisterInicio/Login/Login';
import Register from './Components/RegisterInicio/Register/Register';
import ForgotPassword from './Components/RegisterInicio/ForgotPassword/ForgotPassword';
import RecoveryPassword from './Components/RegisterInicio/RecoveryPassword/RecoveryPassword';

const App = () => { 
    return ( 
        <Routes> 
            <Route path="/" element={<Login/>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} /> 
            <Route path="/forgot-password/:reset_token" element={<RecoveryPassword />} /> 
    {/*         <Route path="/home" element={<Inicio />} /> */} 
        </Routes>
    ); 
}

export default App;
