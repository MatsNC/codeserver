import {Router} from 'express';
import Products from '../../data/fs/files/ProductManager.fs.js';

const productsRouter = Router();

productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.get("/", read);
productsRouter.get("/", async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "CODER API",
      });
    } catch (error) {
      return next(error);
    }
  });
productsRouter.delete("/:pid", destroy);

async function create (req, res, next) {
    try {
      const data = req.body;
      const one = await Products.create(data);
      return res.json({
        statusCode: 201,
        message: "Product ID: " + one.id,
      });
    } catch (error) {
      return next(error);
    }
  };
  
  async function update (req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await Products.update(pid, data);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  };
  
  async function read (req, res, next) {
    try {
      const all = await Products.read();
      return res.json({
        statusCode: 200,
        response: all,
      });
    } catch (error) {
      return next(error);
    }
  };
  
  async function destroy (req, res, next) {
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
      return next(error);
    }
  }

export default productsRouter;
