const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  //Metodo para crear archivo de productos:
  init() {
    fs.unlinkSync(this.path); //Se deja esta línea para que elimine el archivo previamente creado al inicio
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const prodArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, prodArray);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya existe");
    }
  }
  //Metodo para crear un producto:
  async create(data) {
    try {
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error(
          "No se pudo crear el producto. Ingrese nombre, categoria, precio y stock"
        );
      } else {
        const product = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "foto_default.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };

        let allProd = await fs.promises.readFile(this.path, "utf-8");
        allProd = JSON.parse(allProd);
        allProd.push(product);
        allProd = JSON.stringify(allProd, null, 2);
        await fs.promises.writeFile(this.path, allProd);
        console.log("Producto creado");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para leer listado de productos desde archivo:
  async read() {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (allProducts.length === 0) {
        throw new Error("No hay productos cargados");
      } else {
        console.log(
          "Lista de Productos: " + JSON.stringify(allProducts, null, 2)
        );
        //console.log(allProducts);
        return allProducts;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para encontrar un producto por id en archivo:
  async readOne(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let findProduct = allProducts.find((each) => each.id === id);
      if (!findProduct) {
        throw new Error("Producto no encontrado");
      } else {
        console.log(
          "Producto encontrado: " + JSON.stringify(findProduct, null, 2)
        );
        return findProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para eliminar un producto del archivo:
  async destroy(id) {
    try {
      let destroyProduct = await this.readOne(id);
      if (!destroyProduct) {
        throw new Error("Producto no encontrado");
      } else {
        let restOfProducts = await fs.promises.readFile(this.path, "utf-8");
        restOfProducts = JSON.parse(restOfProducts);
        restOfProducts = restOfProducts.filter((each) => each.id !== id);
        restOfProducts = JSON.stringify(restOfProducts, null, 2);
        await fs.promises.writeFile(this.path, restOfProducts);
        console.log(
          "Producto eliminado: " + JSON.stringify(destroyProduct, null, 2)
        );
        return destroyProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    const gestorDeProductos = new ProductManager();
    await gestorDeProductos.create({
      title: "Placa de Video NVIDIA RTX3050",
      photo: "foto_Video_NVIDIA.jpg",
      category: "Placa de Video",
      price: 350000,
      stock: 10,
    });
    await gestorDeProductos.create({
      title: "Monitor Samsung 24 pulgadas",
      photo: "foto_Mon_Sam_24.jpg",
      category: "Monitor",
      price: 150000,
      stock: 30,
    });

    await gestorDeProductos.create({
      title: "Microprocesador AMD Ryzen 7",
      photo: "foto_uP_Ryzen_7.jpg",
      category: "Microprocesador",
      price: 250000,
      stock: 5,
    });

    await gestorDeProductos.create({
      title: "Silla Gamer MID PLUS ROJA",
      photo: "foto_Gamer_Roja.jpg",
      category: "Silla Gamer",
      price: 150000,
      stock: 15,
    });

    await gestorDeProductos.create({
      title: "Mother Asus Prime A320M-K",
      photo: "foto_Mother_A320M.jpg",
      category: "Motherboard",
      price: 185000,
      stock: 50,
    });

    await gestorDeProductos.create({
      title: "Teclado RGB",
      photo: "foto_keyboard.jpg",
      category: "Periféricos",
      price: 55000,
      stock: 150,
    });

    await gestorDeProductos.create({
      title: "Fuente de alimentación 600W",
      photo: "foto_psu600.jpg",
      category: "Fuentes",
      price: 90000,
      stock: 20,
    });

    await gestorDeProductos.create({
      title: "Auriculares con micrófono",
      photo: "foto_headset_mic.jpg",
      category: "Componentes",
      price: 35000,
      stock: 34,
    });

    await gestorDeProductos.create({
      title: "Tarjeta de red Wi-Fi AC1200",
      photo: "foto_wifi_card_AC1200.jpg",
      category: "Componentes",
      price: 120000,
      stock: 22,
    });

    //Este se usa para probar métodos con parámetro id
    await gestorDeProductos.create({
      id: "123456789",
      title: "Memoria RAM DDR4 16GB",
      photo: "foto_ram16.jpg",
      category: "Componentes",
      price: 200000,
      stock: 5,
    });

    await gestorDeProductos.read();
    await gestorDeProductos.readOne("123456789");
    await gestorDeProductos.destroy("123456789");
  } catch (error) {
    console.log(error);
  }
}

test();
