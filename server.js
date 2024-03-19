import express from "express";
import router from "./router.js";

const server = express();

let notes = [];

const PORT = 8080;

const ready = () => console.log("server ready on port " + PORT);

//middleware:
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

const index_route = "/index";
const params_route = "/:nombre/:apellido";
const query_route = "/nickname";
const create_note_route = "/api/notes/:title/:category";
const read_note_route = "/api/read/notes";
const read_note_id_route = "/api/read/notes/:id";

function create_note(req, res) {
  try {
    let { title, category } = req.params;
    res.send({ success: true, title: `${title}`, category: `${category}` });
    return notes.push({ title, category });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success : false });
  }
}

const read_notes = (req, res) => {
  try {
    res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ success : false });
  }
}

function query_function(req, res) {
  let nickname = req.query.nickname || "Coder";
  res.send({ success: true, message: `Hola ${nickname}` });
}

function params_function(req, res) {
  let { nombre, apellido } = req.params;
  res.send({ success: true, message: `Hola ${nombre} ${apellido}` });
}

function index_function(req, res) {
  res.send({ success: true, message: "Recibido del servidor" });
}

server.get(index_route, index_function);
server.get(params_route, params_function);
server.get(query_route, query_function);
server.get(create_note_route, create_note);
server.get(read_note_route, read_notes);

server.get('/', async (request, response) => {
  try {
    return response.status(200).json({ success : true });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success : false });
  }
}) 