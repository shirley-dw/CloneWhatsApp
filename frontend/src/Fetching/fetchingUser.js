export const ObtenerUsuarioById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/user/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const data = await response.json();
    return data.data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};
