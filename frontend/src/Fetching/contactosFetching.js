export const ObtenerContactos = async () => {
  const response = await fetch('http://localhost:3000/api/auth/contacts');
  if (!response.ok) {
    throw new Error('Error al obtener los contactos');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];  // Me aseguro de devolver un array
};
