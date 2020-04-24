const http = require("http");
const { parse } = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

let recursos = {
  mascotas: [
    { tipo: "perro", nombre: "firu", propietario: "Duvan" },
    { tipo: "gato", nombre: "michi", propietario: "Fer" },
  ],
};

const server = http.createServer((req, res) => {
  //1- Obtener url del objeto req
  const url = req.url;
  const urlParseada = parse(url, true);

  //2- Obtener la ruta
  const ruta = urlParseada.pathname;
  const rutaLimpia = ruta.replace("/", "");

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

    //2.5 ordenar los datos (data)
    const dataOrganizada = {
      ruta: rutaLimpia,
      query: query,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // 2.6 manejador de respuesta HANDLER
    let handler;
    if (rutaLimpia && enrutador[rutaLimpia][method]) {
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

const enrutador = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "Esta es ruta" });
  },
  mascotas: {
    get: (data, callback) => {
      callback(200, recursos.mascotas);
    },
    post: (data, callback) => {
      recursos.mascotas.push(data.payload);
      callback(201, data.payload);
    },
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "Error 404" });
  },
};

server.listen(3000, () => {
  console.warn("Corriendo en el pueto 3000");
});
