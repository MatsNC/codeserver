import express from "express";
import Productos from "./data/fs/files/ProductManager.fs.js";
import Users from "./data/fs/files/UserManager.fs.js";

const server = express();

const PORT = 3500;

const ready = () => console.log("server ready on port " + PORT);
server.listen(PORT, ready);

//middleware:
server.use(express.urlencoded({ extended: true }));

//Server for products

const prod_route = "/api/products";
const index_route = "/";
const params_route = "/api/products/:pid";

async function read_products(req, res) {
  try {
    const { category } = req.query;
    const all_products = await Productos.read(category);
    if (all_products.length > 0) {
      res.status(200).json({
        success: true,
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

async function params_function(req, res) {
  try {
    const { pid } = req.params;
    const one = await Productos.readOne(pid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
}

server.get(prod_route, read_products);
server.get(index_route, index_function);
server.get(params_route, params_function);

//////////////////////////////////////////////////////////////

//Server for users
const users_route = "/api/users";
const params_users_route = "/api/users/:uid";

async function read_users(req, res) {
  try {
    const { role } = req.query;
    const all_users = await Users.read(role);
    if (all_users.length > 0) {
      res.status(200).json({
        success: true,
        response: all_users,
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

async function params_users(req, res) {
  try {
    const { uid } = req.params
    const one = await Users.readOne(uid)
    if (one) {
        return res.status(200).json({
            response: one,
            success: true
        })
    } else {
        const error = new Error("NOT FOUND")
        error.statusCode = 404
        throw error
    }
} catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
        response: error.message,
        success: false
    })
}
}

server.get(users_route, read_users);

server.get(params_users_route, params_users);
