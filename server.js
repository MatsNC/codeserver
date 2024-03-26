import express from "express";
import router from "./router.js";
import Products from "./data/fs/files/ProductManager.fs.js";

//Server:
const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
server.listen(PORT, ready);

//middleware:
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//router
server.get("/", async (req, res) => {
  try {
    return res.json({
      statusCode: 200,
      message: "CODER API",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "CODER API ERROR",
    });
  }
});

const create = async (req, res) => {
  try {
    const data = req.body;
    const one = await Products.create(data);
    return res.json({
      statusCode: 201,
      message: "Product ID: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};

const update = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await Products.update(pid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};

const read = async (req, res) => {
  try {
    const all = await Products.read();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const {pid} = req.params;
    const one = await Products.destroy(pid);
    if (one) {
    return res.json({
      statusCode: 200,
      response: one,
    }); }
    else {
      const error = new Error("Not Found");
      error.StatusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    })
  }
}

server.post("/api/products", create);
server.put("/api/products/:pid", update);
server.get("/api/products/", read);
server.delete("/api/products/:pid", destroy);
// //router:
// server.get("/", async (req, res) => {
// try {
// return res.json({
// statusCode: 200,
// message: "CODER API",
// });
// } catch (error) {
// return res.json({ statusCode: 500, message: "CODER API ERROR" });
// }
// });

// async function create(req, res) {
// try {
// const data = req.body;
// const one = await Productos.create(data);
// res.json({
// statusCode: 201,
// message: "Product ID: " + one.id,
// });
// } catch (error) {
// return res.json({
// statusCode: error.statusCode || 500,
// message: error.message || "CODER API ERROR",
// });
// }
// }

// server.post("/api/products", create);
