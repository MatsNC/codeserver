import crypto from "crypto";

class ProductManager {
  static #productos = [];
  //Method to create a new Product:
  create(data) {
    try {
      const product = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "photo_default.jpg",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error(
          "Product not created. Please enter name, category, price and stock"
        );
      } else {
        ProductManager.#productos.push(product);
        console.log("Product created successfully");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to read Products List:
  read() {
    try {
      if (ProductManager.#productos.length === 0) {
        throw new Error("There are no products");
      } else {
        return ProductManager.#productos;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to find a product by id:
  readOne(id) {
    try {
      const findProd = ProductManager.#productos.find(
        (product) => product.id === id
      );
      if (findProd !== undefined) {
        return findProd;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to destroy a product :
  destroy(id) {
    try {
      let destroyProduct = this.readOne(id);
      if (!destroyProduct) {
        throw new Error("Product not found");
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

const oneProduct = new ProductManager();

oneProduct.create({
  title: "Placa de Video NVIDIA RTX3050",
  photo: "foto_Video_NVIDIA.jpg",
  category: "Placa de Video",
  price: 350000,
  stock: 10,
});

oneProduct.create({
  title: "Monitor Samsung 24 pulgadas",
  photo: "foto_Mon_Sam_24.jpg",
  category: "Monitor",
  price: 150000,
  stock: 30,
});

oneProduct.create({
  title: "Microprocesador AMD Ryzen 7",
  photo: "foto_uP_Ryzen_7.jpg",
  category: "Microprocesador",
  price: 250000,
  stock: 5,
});

oneProduct.create({
  title: "Silla Gamer MID PLUS ROJA",
  photo: "foto_Gamer_Roja.jpg",
  category: "Silla Gamer",
  price: 150000,
  stock: 15,
});

oneProduct.create({
  title: "Mother Asus Prime A320M-K",
  photo: "foto_Mother_A320M.jpg",
  category: "Motherboard",
  price: 185000,
  stock: 50,
});

oneProduct.create({
  title: "Teclado RGB",
  photo: "foto_keyboard.jpg",
  category: "Periféricos",
  price: 55000,
  stock: 150,
});

oneProduct.create({
  title: "Fuente de alimentación 600W",
  photo: "foto_psu600.jpg",
  category: "Fuentes",
  price: 90000,
  stock: 20,
});

oneProduct.create({
  title: "Auriculares con micrófono",
  photo: "foto_headset_mic.jpg",
  category: "Componentes",
  price: 35000,
  stock: 34,
});

oneProduct.create({
  title: "Tarjeta de red Wi-Fi AC1200",
  photo: "foto_wifi_card_AC1200.jpg",
  category: "Componentes",
  price: 120000,
  stock: 22,
});

//Este se usa para probar métodos con parámetro id
oneProduct.create({
  id: "123456789",
  title: "Memoria RAM DDR4 16GB",
  photo: "foto_ram16.jpg",
  category: "Componentes",
  price: 200000,
  stock: 5,
});

console.log("List of Products:");
console.log(oneProduct.read());
console.log("Product found:");
console.log(oneProduct.readOne("123456789"));
console.log("Product deleted:");
console.log(oneProduct.destroy("123456789"));
console.log("Updated list:");
console.log(oneProduct.read());

export default Products = new ProductManager();
