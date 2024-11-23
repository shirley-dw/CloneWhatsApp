import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Contacto.css";
/* import { ObtenerContactosById } from "../../../Fetching/contactosFetching"; */


const ContactoCard = ({ id, name, thumbnail, status, text = 'Sin mensajes', hour = '', onSelect }) => {
    const imagenes = thumbnail && thumbnail.startsWith('http') ? thumbnail : `/imagenes/${thumbnail}`;
    const [contacto, setContacto] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        /*  fetchContactoById(param.id); */
        /* if (param.id ) {
            navigate('/inicio');
        } */
    }, [id]);/* 
    const fetchContactoById = async (id) => {
        try {
            const contacto = await ObtenerContactosById(id);
            setContacto(contacto);
        } catch (error) {
            console.error("Error al obtener contactos:", error);
        } finally {
            setLoading(false);
        }
    };
 */
    const handleSelectContacto = (id) => {
        navigate(`/mensaje/${id}`, { state: { id, name, thumbnail, status, text, hour } });
    };
    return (
        <div className="contacto" onClick={() => handleSelectContacto(id)}>
            <div key={id} className="contact-item">
                <img src={imagenes} alt={name} className="img" />
                <div className="dato">
                    <p className="name">
                        <strong>{name}</strong>
                    </p>
                    <div className="ultimo-mensaje">{text}</div>
                    <div className="status">{status}</div>
                </div>
                <div className="time">{hour}</div>
            </div>
        </div>
    );
};

export default ContactoCard;