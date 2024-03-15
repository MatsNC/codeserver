const crypto = require("crypto");

class ProductManager {
  static #productos = [];
  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "foto_default.jpg",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      if (!data.title) {
        throw new Error("No se pudo crear el producto");
      } else {
        ProductManager.#productos.push(product);
        console.log("Producto Creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      if (ProductManager.#productos.length === 0) {
        throw new Error("No hay productos cargados");
      } else {
        return ProductManager.#productos;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para encontrar un producto por id
  readOne(id) {
    const findProd = ProductManager.#productos.find(
      (product) => product.id === id
    );
    return findProd !== undefined ? findProd : "Producto no encontrado";
  }
  //Metodo para eliminar un producto
  destroy(id) {
    const newArray = ProductManager.#productos.filter(
      (product) => product.id !== id
    );
    console.log(newArray);
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  title: "Placa de Video NVIDIA RTX3050",
  photo: "foto_Video_NVIDIA.jpg",
  price: 350000,
  stock: 10,
});

gestorDeProductos.create({
  title: "Monitor Samsung 24 pulgadas",
  photo: "foto_Mon_Sam_24.jpg",
  price: 150000,
  stock: 30,
});

gestorDeProductos.create({
  title: "Microprocesador AMD Ryzen 7",
  photo: "foto_uP_Ryzen_7.jpg",
  price: 250000,
  stock: 5,
});

gestorDeProductos.create({
  title: "Silla Gamer MID PLUS ROJA",
  photo: "foto_Gamer_Roja.jpg",
  price: 150000,
  stock: 15,
});

gestorDeProductos.create({
  title: "Mother Asus Prime A320M-K",
  photo: "foto_Mother_A320M.jpg",
  price: 185000,
  stock: 50,
});

console.log("Array de Productos:");
console.log(gestorDeProductos.read());
console.log("Producto buscado:");
console.log(gestorDeProductos.readOne(1));
console.log("Array actualizado:");
gestorDeProductos.destroy(1);
console.log(gestorDeProductos.read());
