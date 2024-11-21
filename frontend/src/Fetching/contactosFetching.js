export const ObtenerContactos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/contacts',{ method: "GET" });
    if (!response.ok) {
      throw new Error('Error al obtener los contactos');
    }
    const data = await response.json();
    return data.data.contacts; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    throw error;
  }
};

