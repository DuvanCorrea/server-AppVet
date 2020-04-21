const http = require("http");

const server = http.createServer((req, res) => {
  //1- Obtener url del objeto req
  //2- Obtener la ruta
  //3- enviar una respuesta dependiendo de la ruta
});

server.listen(3000, () => {
  console.warn("Corriendo en el pueto 3000");
});
