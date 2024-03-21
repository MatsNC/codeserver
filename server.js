import express from "express";
import Productos from "./data/fs/files/ProductManager.fs.js";

const server = express();

const PORT = 3500;

const ready = () => console.log("server ready on port " + PORT);
server.listen(PORT, ready);

//middleware:
server.use(express.urlencoded({ extended: true }));

// server.use(express.json());

// //router:
// server.get("/", async (req, res) => {
//   try {
//     return res.json({
//       statusCode: 200,
//       message: "CODER API",
//     });
//   } catch (error) {
//     return res.json({ statusCode: 500, message: "CODER API ERROR" });
//   }
// });

// async function create(req, res) {
//   try {
//     const data = req.body;
//     const one = await Productos.create(data);
//     res.json({
//       statusCode: 201,
//       message: "Product ID: " + one.id,
//     });
//   } catch (error) {
//     return res.json({
//       statusCode: error.statusCode || 500,
//       message: error.message || "CODER API ERROR",
//     });
//   }
// }

// server.post("/api/products", create);

//////////////////////////////////////////////

const prod_route = "/api/products";
const index_route = "/";

async function read_products(req, res) {
  try {
    const { category } = req.query;
    let all_products;
    if (category) {
      all_products = await Productos.read(category);
      console.log(all_products);
    } else {
      all_products = await Productos.read();
      console.log(all_products);
    }
    if (all_products.length > 0) {
      res.status(200).json({
        success: true,
        category,
        response: all_products,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
}

async function index_function(req, res) {
  try {
    res.status(200).json({ success: true, message: "PC Store Web Server" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load web page" });
  }
}

server.get(prod_route, read_products);
server.get(index_route, index_function);
