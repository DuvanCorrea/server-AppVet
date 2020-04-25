// server
const server = require("./server/server.js");

// enrutador
const enrutador = require("./rutas/rutas.js");

server.listen(3000, () => {
  console.warn("Corriendo en el pueto 3000");
});
