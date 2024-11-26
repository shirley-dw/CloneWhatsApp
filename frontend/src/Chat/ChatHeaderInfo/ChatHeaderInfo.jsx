import { useParams, Link, useLocation } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import './ChatHeaderInfo.css';
import { ObtenerContactosById } from "../../Fetching/contactosFetching";
import { useEffect, useState } from "react";

const ChatHeaderInfo = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImage = '/imagenes/user.png'; // Ruta de la imagen por defecto
  const imagenes = state && state.thumbnail && state.thumbnail.startsWith("http")
    ? state.thumbnail
    : (state && state.thumbnail ? `/imagenes/${state.thumbnail}` : defaultImage);

  useEffect(() => {
    ObtenerContactosById(id).then((contacto) => {
      setContacto(contacto);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="chat-header-info">
      <div className="contact">
        <Link to={"/inicio"}>
          <SlArrowLeft className="arrow" />
        </Link>
        {state && (
          <>
            <img className="profile-pic" src={imagenes} alt="Foto perfil" />
            <div className="chat-header">
              <div className="profile-name">{state.name}</div>
              <div className="status-text">{state.status}</div>
            </div>
          </>
        )}
      </div>
      <div className="icons">
        <Link to={`/info`}>
          <BsThreeDotsVertical className="icons" />
        </Link>
      </div>
    </div>
  );
};

export default ChatHeaderInfo;
