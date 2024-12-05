import React from 'react';
import { FaRegBell, FaRegBookmark } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import { PiLockLaminatedFill } from "react-icons/pi";
import { MdOutlinePhone, MdOutlineVideocam, MdSearch, MdLock, MdOutlineTimelapse } from "react-icons/md";
import './InfoContact.css';

const InfoContact = ({ contacto }) => {
    return (
        <div className="info-options">
            <div className="options">
                <div className="icon-container"><MdOutlinePhone className="opciones-icons" /></div>
                <div className="icon-container"><MdOutlineVideocam className="opciones-icons" /></div>
                <div className="icon-container"><MdSearch className="opciones-icons" /></div>
            </div>
            <div className="deco">
                <div className="avanced"><FaRegBell className="iconos" /><p>Notificaciones</p></div>
                <div className="avanced"><AiOutlinePicture className="iconos" /><p>Visibilidad de archivos multimedia</p></div>
                <div className="avanced"><FaRegBookmark className="iconos" /><p>Mensajes conservados</p></div>
                <div className="avanced"><MdLock className="iconos" /><p>Los mensajes y las llamadas están cifrados de extremo a extremo</p></div>
                <div className="avanced"><MdOutlineTimelapse className="iconos" /><p>Mensajes temporales <span>90 días</span></p></div>
                <div className="avanced"><PiLockLaminatedFill className="iconos" /><p>Restringir chat</p></div>
            </div>
        </div>
    );
};

export default InfoContact