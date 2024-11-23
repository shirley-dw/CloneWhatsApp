export const ObtenerContactos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/contacts', { method: "GET" });

    if (!response.ok) {

      throw new Error('Error al obtener los contactos');
    }
    const data = await response.json();

    return data.data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    throw error;
  }
};

export const ObtenerContactosById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/contacts/${id}`, { method: "GET" });
    if (!response.ok) {
      throw new Error('Error al obtener los contactos');
    }
    const data = await response.json();
    return data.data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    throw error;
  }
};
