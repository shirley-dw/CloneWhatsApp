export const ObtenerMensajes = async () => {
    const response = await fetch('http://localhost:3000/api/auth/messages', { method: "GET" }); 
    return  response.json();
  };
