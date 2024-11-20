import { useParams, Link } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import './ChatHeaderInfo.css';
import useContactos from "../../hooks/useContact";

const ChatHeaderInfo = () => {
  const { id } = useParams();
  const { contacto, loading } = useContactos(id);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="chat-header-info">
      <div className="contact">
        <Link to={"/inicio"}>
          <SlArrowLeft className="arrow" />
        </Link>
        {contacto && (
          <>
            <img className="profile-pic" src={'/imagenes/' + contacto.thumbnail} alt="Foto perfil" />
            <div className="chat-header">
              <div className="profile-name">{contacto.name}</div>
              <div className="status-text">{contacto.status}</div>
            </div>
          </>
        )}
      </div>
      <div className="icons">
        <Link to={`/contactInfo/${id}`}>
          <BsThreeDotsVertical className="icons" />
        </Link>
      </div>
    </div>
  );
};

export default ChatHeaderInfo;
