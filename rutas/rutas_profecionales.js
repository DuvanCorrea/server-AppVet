module.exports = {
  get: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.profecionales[data.indice]) {
        return callback(200, recursos.profecionales[data.indice]);
      }
      return callback(404, { mensaje: "profecional no encontrado" });
    }
    callback(200, recursos.profecionales);
  },
  post: (data, callback) => {
    recursos.profecionales.push(data.payload);
    callback(201, data.payload);
  },
  put: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.profecionales[data.indice]) {
        recursos.profecionales[data.indice] = data.payload;
        return callback(200, recursos.profecionales[data.indice]);
      }

      callback(400, { mensage: "profecional no editado" });
    }
  },
  delete: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.profecionales[data.indice]) {
        recursos.profecionales = recursos.profecionales.filter((e, i) => {
          if (i != data.indice) {
            return e;
          }
        });
        return callback(200, { mensage: "profecional borrado" });
      }

      callback(200, { mensage: "profecional no borrado" });
    }
  },
};
