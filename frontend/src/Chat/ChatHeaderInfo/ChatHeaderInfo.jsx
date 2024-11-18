// Importo librerias 
import { useParams, Link} from "react-router-dom"; // Se utiliza una sola importación y se extraen los hook y componente a utilizar.
import { IoInformationCircleOutline } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { GoDeviceCameraVideo } from "react-icons/go";
import { MdPhone } from "react-icons/md";

/* Componentes */
import './ChatHeaderInfo.css';

/* Custom Hook */
import useContactos from "../../hooks/useContact";
const ChatHeaderInfo = () => {
  const { id } = useParams();

  /* Estados del hook */
  const { contacto, loading } = useContactos(id);

  /* Invocación del hook pasando como parámetro el id obtenido por useParams() */
  useContactos(id);

  if (loading) {
    return <div>Cargando...</div>;
  } else {
//Render
    return (
      <div className="chat-header-info">
        <div className="contact">
          <Link to={"/"}>
            <SlArrowLeft className="arrow" />
          </Link>
          
          {
            contacto && <>
              <img className="profile-pic" src={'/imagenes/' + contacto.thumbnail} alt="Foto perfil" />
              <div className="chat-header">
                <div className="profile-name">{contacto.nombre}</div>
                <div className="status-text">{contacto.ultima_conexion}</div>
              </div>
            </>
          }
        </div>
        <div className="icons">
          <GoDeviceCameraVideo />
          <MdPhone />
          <Link to={`/contactInfo/${id}`}>
            <IoInformationCircleOutline className="icono-info" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ChatHeaderInfo;