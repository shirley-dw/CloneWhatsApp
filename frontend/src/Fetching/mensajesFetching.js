export const ObtenerMensajes = async () => {
  try {
    console.log("Iniciando fetch a la API de mensajes");
    const response = await fetch(`http://localhost:3000/api/auth/messages`, { method: "GET" });

    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`Error al obtener los mensajes: ${response.statusText}`);
    }

    const data = await response.json();

    // Registro de depuración
    console.log("Datos crudos recibidos de la API:", data);

    // Verificación adicional del formato de los datos
    if (!data || !Array.isArray(data)) {
      throw new Error('Los datos obtenidos no son un array de mensajes');
    }

    console.log("Mensajes obtenidos:", data);

    return data;
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};


export const ObtenerMensajesById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/messages/${id}`, { method: "GET" });
    if (!response.ok) {
      throw new Error('Error al obtener los mensajes');
    }
    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    throw error;
  }
}