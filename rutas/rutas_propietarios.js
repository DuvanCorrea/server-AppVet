module.exports = {
  get: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.propietarios[data.indice]) {
        return callback(200, recursos.propietarios[data.indice]);
      }
      return callback(404, { mensaje: "propietario no encontrado" });
    }
    callback(200, recursos.propietarios);
  },
  post: (data, callback) => {
    recursos.propietarios.push(data.payload);
    callback(201, data.payload);
  },
  put: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.propietarios[data.indice]) {
        recursos.propietarios[data.indice] = data.payload;
        return callback(200, recursos.propietarios[data.indice]);
      }

      callback(400, { mensage: "propietario no editado" });
    }
  },
  delete: (data, callback) => {
    if (data.indice !== null) {
      if (recursos.propietarios[data.indice]) {
        recursos.propietarios = recursos.propietarios.filter((e, i) => {
          if (i != data.indice) {
            return e;
          }
        });
        return callback(200, { mensage: "propietario borrado" });
      }

      callback(200, { mensage: "propietario no borrado" });
    }
  },
};
