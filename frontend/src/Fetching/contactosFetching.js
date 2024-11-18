// Fetching contactos

export const ObtenerContactos = async () => {

 const response = await fetch('/mensajeria.json', { method: "GET" }); 
  return  response.json();
};


/*
· El codigo define una función asíncrona  ObtenerContactos, se encarga de obtener una lista de contactos desde el archivo JSON
  ubicado en la ruta /mensajeria.json.

· El objeto { method: "GET" }) especifica que se trata de una solicitud GET, la función fetch devuelve una promesa que se resuelve 
  con un objeto Response cuando se completa la solicitud.

· El método json() devuelve una promesa que se resuelve con los datos parseados. */