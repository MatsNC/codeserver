import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  //Method to create a new Products file:
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const prodArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, prodArray);
      console.log("File created");
    } else {
      console.log("File already exists");
    }
  }
  //Method to create a new Product:
  async create(data) {
    try {
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error(
          "Product not created. Please enter name, category, price and stock"
        );
      } else {
        const product = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "photo_default.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };

        let allProd = await fs.promises.readFile(this.path, "utf-8");
        allProd = JSON.parse(allProd);
        allProd.push(product);
        allProd = JSON.stringify(allProd, null, 2);
        await fs.promises.writeFile(this.path, allProd);
        console.log("Product created successfully");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to read Products List from file:
  async read(cat) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (allProducts.length === 0) {
        throw new Error("There are no products");
      } else {
        if (cat) {
          allProducts = allProducts.filter((each) => each.category === cat);
        }
        console.log(
          "List of Products: " + JSON.stringify(allProducts, null, 2)
        );
      }
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }
  //Method to find a product by id in the file:
  async readOne(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let findProduct = allProducts.find((each) => each.id === id);
      if (!findProduct) {
        throw new Error("Product not found");
      } else {
        console.log("Product found: " + JSON.stringify(findProduct, null, 2));
        return findProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to destroy a product in the file:
  async destroy(id) {
    try {
      let destroyProduct = await this.readOne(id);
      if (!destroyProduct) {
        throw new Error("Product not found");
      } else {
        let restOfProducts = await fs.promises.readFile(this.path, "utf-8");
        restOfProducts = JSON.parse(restOfProducts);
        restOfProducts = restOfProducts.filter((each) => each.id !== id);
        restOfProducts = JSON.stringify(restOfProducts, null, 2);
        await fs.promises.writeFile(this.path, restOfProducts);
        console.log(
          "Product deleted: " + JSON.stringify(destroyProduct, null, 2)
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
    const oneProduct = new ProductManager();
    // await oneProduct.create({
    //   title: "Placa de Video NVIDIA RTX3050",
    //   photo: "foto_Video_NVIDIA.jpg",
    //   category: "Placa de Video",
    //   price: 350000,
    //   stock: 10,
    // });
    // await oneProduct.create({
    //   title: "Monitor Samsung 24 pulgadas",
    //   photo: "foto_Mon_Sam_24.jpg",
    //   category: "Monitor",
    //   price: 150000,
    //   stock: 30,
    // });

    // await oneProduct.create({
    //   title: "Microprocesador AMD Ryzen 7",
    //   photo: "foto_uP_Ryzen_7.jpg",
    //   category: "Microprocesador",
    //   price: 250000,
    //   stock: 5,
    // });

    // await oneProduct.create({
    //   title: "Silla Gamer MID PLUS ROJA",
    //   photo: "foto_Gamer_Roja.jpg",
    //   category: "Silla Gamer",
    //   price: 150000,
    //   stock: 15,
    // });

    // await oneProduct.create({
    //   title: "Mother Asus Prime A320M-K",
    //   photo: "foto_Mother_A320M.jpg",
    //   category: "Motherboard",
    //   price: 185000,
    //   stock: 50,
    // });

    // await oneProduct.create({
    //   title: "Teclado RGB",
    //   photo: "foto_keyboard.jpg",
    //   category: "Periféricos",
    //   price: 55000,
    //   stock: 150,
    // });

    // await oneProduct.create({
    //   title: "Fuente de alimentación 600W",
    //   photo: "foto_psu600.jpg",
    //   category: "Fuentes",
    //   price: 90000,
    //   stock: 20,
    // });

    // await oneProduct.create({
    //   title: "Auriculares con micrófono",
    //   photo: "foto_headset_mic.jpg",
    //   category: "Componentes",
    //   price: 35000,
    //   stock: 34,
    // });

    // await oneProduct.create({
    //   title: "Tarjeta de red Wi-Fi AC1200",
    //   photo: "foto_wifi_card_AC1200.jpg",
    //   category: "Componentes",
    //   price: 120000,
    //   stock: 22,
    // });

    // //Este se usa para probar métodos con parámetro id
    // await oneProduct.create({
    //   id: "123456789",
    //   title: "Memoria RAM DDR4 16GB",
    //   photo: "foto_ram16.jpg",
    //   category: "Componentes",
    //   price: 200000,
    //   stock: 5,
    // });

    // await oneProduct.create({
    //   title: "Procesador AMD Ryzen 7 5800X",
    //   photo: "foto_Procesador_AMD.jpg",
    //   category: "Procesador",
    //   price: 450000,
    //   stock: 15,
    // });

    // await oneProduct.create({
    //   title: "Memoria RAM Corsair Vengeance RGB Pro 16GB",
    //   photo: "foto_Memoria_RAM_Corsair.jpg",
    //   category: "Memoria RAM",
    //   price: 200000,
    //   stock: 20,
    // });

    // await oneProduct.create({
    //   title: "Disco Duro SSD Samsung 1TB",
    //   photo: "foto_SSD_Samsung.jpg",
    //   category: "Almacenamiento",
    //   price: 180000,
    //   stock: 25,
    // });

    // await oneProduct.create({
    //   title: "Monitor LG UltraWide 34 pulgadas",
    //   photo: "foto_Monitor_LG.jpg",
    //   category: "Monitores",
    //   price: 550000,
    //   stock: 8,
    // });

    // await oneProduct.create({
    //   title: "Teclado mecánico Corsair K95 RGB Platinum",
    //   photo: "foto_Teclado_Corsair.jpg",
    //   category: "Periféricos",
    //   price: 280000,
    //   stock: 12,
    // });

    // await oneProduct.create({
    //   title: "Ratón Logitech G502 HERO",
    //   photo: "foto_Raton_Logitech.jpg",
    //   category: "Periféricos",
    //   price: 150000,
    //   stock: 30,
    // });

    // await oneProduct.create({
    //   title: "Tarjeta madre ASUS ROG Strix B550-F",
    //   photo: "foto_Tarjeta_madre_ASUS.jpg",
    //   category: "Componentes",
    //   price: 280000,
    //   stock: 10,
    // });

    // await oneProduct.create({
    //   title: "Fuente de alimentación Corsair RM750x",
    //   photo: "foto_Fuente_alimentacion_Corsair.jpg",
    //   category: "Componentes",
    //   price: 200000,
    //   stock: 15,
    // });

    // await oneProduct.create({
    //   title: "Caja de PC NZXT H510",
    //   photo: "foto_Caja_PC_NZXT.jpg",
    //   category: "Componentes",
    //   price: 120000,
    //   stock: 20,
    // });

    // await oneProduct.create({
    //   title: "Ventilador Corsair LL120 RGB",
    //   photo: "foto_Ventilador_Corsair.jpg",
    //   category: "Componentes",
    //   price: 50000,
    //   stock: 40,
    // });

    // await oneProduct.read();
    // await oneProduct.readOne("123456789");
    // await oneProduct.destroy("123456789");
  } catch (error) {
    console.log(error);
  }
}

test();

const Productos = new ProductManager();
export default Productos;

