export const ObtenerContactos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/contacts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }
    const data = await response.json();

    return data.data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};

export const ObtenerContactosById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/contacts/${id}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }
    const data = await response.json();
    return data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};

export const ObtenerContactosByUserId = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/contacts/user/${id}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los contactos del usuario");
    }
    const data = await response.json();
    return data; // Accedo a 'data.contacts' dentro de 'Setdata'
  } catch (error) {
    console.error("Error al obtener los contactos del usuario:", error);
    throw error;
  }
};


export const actualizarContacto = async (id, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/contacts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("access-token"))}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el contacto");
    }

    const data = await response.json();
    return data.data.contact; // Devuelve el contacto actualizado
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    throw error;
  }
};

export const eliminarContacto = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("access-token"))}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el contacto");
    }

    const data = await response.json();
    return data; // Devuelve el mensaje de éxito
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    throw error;
  }
};
