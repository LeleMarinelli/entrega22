const express = require("express");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// DATABASE CONFIG
const dbconfig = require("./db/config");
const knex = require("knex")(dbconfig.mariaDB);
const knexSq = require("knex")(dbconfig.sqlite);

// CREAR TABLAS
const createTableMemoria = require("./tables/tableMemoria");
const createTableArchivo = require("./tables/tableArchivo");

// CONTENEDORES
const ContenedorMemoria = require("./models/contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("./models/contenedores/ContenedorArchivo.js");

const productosApi = new ContenedorMemoria(knex, "memoria");
const mensajesApi = new ContenedorArchivo(knexSq, "archivo");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// SOCKET IO
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  //   Productos   //
  let productos = await productosApi.listarAll();
  console.table(productos);
  socket.emit("productos", productos);

  socket.on("update", async (producto) => {
    productos = await productosApi.listarAll();
    console.table(productos);

    productosApi.guardar(producto);
    io.sockets.emit("productos", productos);
  });

  //   Mensajes   //
  socket.emit("mensajes", await mensajesApi.listarAll());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await mensajesApi.guardar(mensaje);
    console.table(mensaje);
    io.sockets.emit("mensajes", await mensajesApi.listarAll());
  });
});

// CONEXIÓN
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
connectedServer.on("error", (error) => console.log("Error: ", error));
