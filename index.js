const http = require("http");
const { parse } = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
  //1- Obtener url del objeto req
  const url = req.url;
  const urlParseada = parse(url, true);

  //2- Obtener la ruta
  const ruta = urlParseada.pathname;

  //2.1- Obtener method
  const method = req.method.toLowerCase();

  //2.2- Obtener query
  const { query = {} } = urlParseada;

  //2.3- Obtener header
  const { headers = {} } = req;

  //2.4- Obtener payload, bueno si hay uno
  const decoder = new StringDecoder("utf-8");
  const buffer = "";

  req.on("data", () => {});

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
