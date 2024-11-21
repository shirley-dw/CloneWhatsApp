export const ObtenerMensajes = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/messages`, { method: "GET" });
    if (!response.ok) {
      throw new Error('Error al obtener los mensajes');
    }
    const data = await response.json();
    return data.data.messages; 
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    throw error;
  }
};
