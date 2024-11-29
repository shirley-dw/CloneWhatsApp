// Importo componentes
import { ChatHeaderInfo, ListaMensajes } from '../index.js';
// Importo estilos
import './ChatScreen.css';

const ChatScreen = () => {
    return (
        <div className='chat'>
            <ChatHeaderInfo />
            <div className='chat-screen'>
                <ListaMensajes />
            </div>
        </div>
    );
};

export default ChatScreen;
