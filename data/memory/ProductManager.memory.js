const crypto = require("crypto");

class ProductManager {
  static #productos = [];
  //Metodo para crear un producto:
  create(data) {
    try {
      const product = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "foto_default.jpg",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error(
          "No se pudo crear el producto. Ingrese nombre, categoria, precio y stock"
        );
      } else {
        ProductManager.#productos.push(product);
        console.log("Producto Creado");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para leer listado de productos:
  read() {
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
  //Metodo para encontrar un producto especifico:
  readOne(id) {
    try {
      const findProd = ProductManager.#productos.find(
        (product) => product.id === id
      );
      if (findProd !== undefined) {
        return findProd;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para eliminar un producto:
  destroy(id) {
    try {
      let destroyProduct = this.readOne(id);
      if (!destroyProduct) {
        throw new Error("Producto no encontrado");
      } else {
        const newArray = ProductManager.#productos.filter(
          (product) => product.id !== id
        );
        ProductManager.#productos = newArray;
        return destroyProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  title: "Placa de Video NVIDIA RTX3050",
  photo: "foto_Video_NVIDIA.jpg",
  category: "Placa de Video",
  price: 350000,
  stock: 10,
});

gestorDeProductos.create({
  title: "Monitor Samsung 24 pulgadas",
  photo: "foto_Mon_Sam_24.jpg",
  category: "Monitor",
  price: 150000,
  stock: 30,
});

gestorDeProductos.create({
  title: "Microprocesador AMD Ryzen 7",
  photo: "foto_uP_Ryzen_7.jpg",
  category: "Microprocesador",
  price: 250000,
  stock: 5,
});

gestorDeProductos.create({
  title: "Silla Gamer MID PLUS ROJA",
  photo: "foto_Gamer_Roja.jpg",
  category: "Silla Gamer",
  price: 150000,
  stock: 15,
});

gestorDeProductos.create({
  title: "Mother Asus Prime A320M-K",
  photo: "foto_Mother_A320M.jpg",
  category: "Motherboard",
  price: 185000,
  stock: 50,
});

gestorDeProductos.create({
  title: "Teclado RGB",
  photo: "foto_keyboard.jpg",
  category: "Periféricos",
  price: 55000,
  stock: 150,
});

gestorDeProductos.create({
  title: "Fuente de alimentación 600W",
  photo: "foto_psu600.jpg",
  category: "Fuentes",
  price: 90000,
  stock: 20,
});

gestorDeProductos.create({
  title: "Auriculares con micrófono",
  photo: "foto_headset_mic.jpg",
  category: "Componentes",
  price: 35000,
  stock: 34,
});

gestorDeProductos.create({
  title: "Tarjeta de red Wi-Fi AC1200",
  photo: "foto_wifi_card_AC1200.jpg",
  category: "Componentes",
  price: 120000,
  stock: 22,
});

//Este se usa para probar métodos con parámetro id
gestorDeProductos.create({
  id: "123456789",
  title: "Memoria RAM DDR4 16GB",
  photo: "foto_ram16.jpg",
  category: "Componentes",
  price: 200000,
  stock: 5,
});

console.log("Listado de Productos:");
console.log(gestorDeProductos.read());
console.log("Producto buscado:");
console.log(gestorDeProductos.readOne("123456789"));
console.log("Producto borrado:");
console.log(gestorDeProductos.destroy("123456789"));
console.log("Listado actualizado:");
console.log(gestorDeProductos.read());
