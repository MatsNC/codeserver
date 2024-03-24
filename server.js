import express from "express";
import router from "./router.js";

const server = express();

const PORT = 8080;

const ready = () => console.log("server ready on port " + PORT);

//middleware:
server.use(express.urlencoded({ extended: true }));

server.use(express.json());

//router:
server.get("/", async (req, res) => {
try {
return res.json({
statusCode: 200,
message: "CODER API",
});
} catch (error) {
return res.json({ statusCode: 500, message: "CODER API ERROR" });
}
});

async function create(req, res) {
try {
const data = req.body;
const one = await Productos.create(data);
res.json({
statusCode: 201,
message: "Product ID: " + one.id,
});
} catch (error) {
return res.json({
statusCode: error.statusCode || 500,
message: error.message || "CODER API ERROR",
});
}
}

server.post("/api/products", create);

