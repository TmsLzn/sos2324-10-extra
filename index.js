import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";

import { API_TLR_v2 } from "./api/api-TLR-v2.js";
import { backend_MRF_v2 } from "./api/api-MRF_v2.js";

// neDB
import dataStore from "nedb";
let db_TLR = new dataStore();
let db_MRF = new dataStore();

// Adaptador Svelte
import { handler } from "./front/build/handler.js";
import cors from "cors";
let app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

let server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  // Manejar eventos de actualización de datos
  socket.on("updateData", (updatedData) => {
    console.log("Received updated data:", updatedData);
    // Emitir datos actualizados a todos los clientes
    io.emit("dataUpdated", updatedData);
  });
});

// Configurar API y backend
API_TLR_v2(app, db_TLR);
backend_MRF_v2(app, db_MRF);

// Uso del handler
app.use(handler);

// Establecer subdirectorios de la web
import path from "path";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/", express.static("./public"));
