let recursos = require("../recursos/recursos.js");

module.exports = enrutador = {
  profecionales: require("./rutas_profecionales"),
  propietarios: require("./rutas_propietarios"),
  mascotas: require("./rutas_mascotas.js"),
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "Error 404" });
  },
};
