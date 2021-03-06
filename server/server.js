const http = require("http");
const { parse } = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

module.exports = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  //1- Obtener url del objeto req
  const url = req.url;
  const urlParseada = parse(url, true);

  //2- Obtener la ruta
  const ruta = urlParseada.pathname;
  let rutaLimpia = ruta.replace("/", "");

  //2.1- Obtener method
  const method = req.method.toLowerCase();

  //2.2- Obtener query
  const { query = {} } = urlParseada;

  //2.3- Obtener header
  const { headers = {} } = req;

  //2.4- Obtener payload, bueno si hay uno
  let decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", (data) => {
    buffer += decoder.end();

    // convertir bufer en json
    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer);
    }

    //sacar indice
    let indice = null;
    if (rutaLimpia.indexOf("/") > -1) {
      let rutaDividida = rutaLimpia.split("/");
      indice = parseInt(rutaDividida[1], 10);
      rutaLimpia = rutaDividida[0];
    }

    //2.5 ordenar los datos (data)
    const dataOrganizada = {
      indice: indice,
      ruta: rutaLimpia,
      query: query,
      method: method,
      headers: headers,
      payload: buffer,
    };
    console.log(dataOrganizada);

    // 2.6 manejador de respuesta HANDLER
    let handler;
    if (rutaLimpia && enrutador[rutaLimpia] && enrutador[rutaLimpia][method]) {
      handler = enrutador[rutaLimpia][method];
    } else {
      handler = enrutador.noEncontrado;
    }

    //4- enviar una respuesta dependiendo de la ruta
    if (typeof handler === "function") {
      handler(dataOrganizada, (statusCode = 200, mensaje) => {
        const respuesta = JSON.stringify(mensaje);
        res.writeHead(statusCode);
        //respuesta real
        res.end(respuesta);
      });
    }
  });
});
