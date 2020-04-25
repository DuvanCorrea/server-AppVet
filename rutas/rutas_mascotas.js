module.exports = {
  get: (data, callback) => {
    console.log(data.indice);
    if (data.indice !== null) {
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
  put: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.mascotas[data.indice]) {
        recursos.mascotas[data.indice] = data.payload;
        return callback(200, recursos.mascotas[data.indice]);
      }

      callback(400, { mensage: "mascota no editada" });
    }
  },
  delete: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.mascotas[data.indice]) {
        recursos.mascotas = recursos.mascotas.filter((e, i) => {
          if (i != data.indice) {
            return e;
          }
        });
        return callback(200, { mensage: "mascota borrada" });
      }

      callback(200, { mensage: "mascota no borrada" });
    }
  },
};
