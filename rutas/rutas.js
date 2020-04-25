let recursos = require("../recursos/recursos.js");

module.exports = enrutador = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "Esta es ruta" });
  },
  mascotas: {
    get: (data, callback) => {
      if (data.indicen !== null) {
        if (recursos.mascotas[data.indice]) {
          return callback(200, recursos.mascotas[data.indice]);
        }
        return callback(404, { mensaje: "mascota no encontrada" });
      }
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
