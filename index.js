const http = require("http");
const { parse } = require("url");

const server = http.createServer((req, res) => {
  //1- Obtener url del objeto req
  const url = req.url;
  const urlParseada = parse(url, true);

  //2- Obtener la ruta
  const ruta = urlParseada.pathname;

  //3- enviar una respuesta dependiendo de la ruta
  switch (ruta) {
    case "/ruta":
      res.end("estas en /ruta");
      break;

    default:
      res.end("No se donde estas wey");
      break;
  }
});

server.listen(3000, () => {
  console.warn("Corriendo en el pueto 3000");
});
