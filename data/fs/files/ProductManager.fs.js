const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  init() {
    //fs.unlinkSync(this.path); //Sacar esto después
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const prodArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, prodArray);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya existe");
    }
  }
  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Ingrese titulo");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
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
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (allProducts.length === 0) {
        throw new Error("No hay notas");
      } else {
        console.log(
          "Lista de Productos: " + JSON.stringify(allProducts, null, 2)
        );
        console.log(allProducts);
        return allProducts;
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  async destroy(id) {
    try {
      let destroyProduct = this.readOne(id);
      if (!destroyProduct) {
        throw new Error("Producto no encontrado");
      } else {
        let restOfProducts = await fs.promises.readFile(this.path, "utf-8");
        restOfProducts = JSON.parse(restOfProducts);
        restOfProducts = restOfProducts.filter((each) => each.id !== id);
        restOfProducts = JSON.stringify(restOfProducts, null, 2);
        await fs.promises.writeFile(this.path, restOfProducts);
        console.log(
          "Id del Producto eliminado: " +
            JSON.stringify(destroyProduct.id, null, 2)
        );
        //console.log(destroyProduct);
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

    await gestorDeProductos.read();
    await gestorDeProductos.readOne("263cb910628fc096af913e32");
    await gestorDeProductos.destroy("7041405604e36f3ea35b255c");
  } catch (error) {
    console.log(error);
  }
}

test();

// gestorDeProductos.create({
//   title: "Placa de Video NVIDIA RTX3050",
//   photo: "foto_Video_NVIDIA.jpg",
//   price: 350000,
//   stock: 10,
// });

/////////////////////////////////////////

// class ProductManager {
//   static #productos = [];
//   create(data) {
//     try {
//       const product = {
//         id:
//           ProductManager.#productos.length === 0
//             ? 1
//             : ProductManager.#productos[ProductManager.#productos.length - 1]
//                 .id + 1,
//         title: data.title,
//         photo: data.photo,
//         price: data.price,
//         stock: data.stock,
//       };
//       if (!data.title) {
//         throw new Error("No se pudo crear el producto");
//       } else {
//         ProductManager.#productos.push(product);
//         console.log("Producto Creado");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   read() {
//     return ProductManager.#productos;
//   }
//   //Metodo para encontrar un producto por id
//   readOne(id) {
//     const findProd = ProductManager.#productos.find(
//       (product) => product.id === id
//     );
//     return findProd !== undefined ? findProd : "Producto no encontrado";
//   }
//   //Metodo para eliminar un producto
//   destroy(id) {
//     const newArray = ProductManager.#productos.filter(
//       (product) => product.id !== id
//     );
//     console.log(newArray);
//   }
//   //Metodo para actualizar un producto cuyo id se pasa por parámetro
//   // update(id, product) {
//   //   let prodReplace = this.readOne(id);
//   //   ProductManager.#productos[prodReplace.id - 1] = product;
//   // }
// }

// const gestorDeProductos = new ProductManager();

// gestorDeProductos.create({
//   title: "Placa de Video NVIDIA RTX3050",
//   photo: "foto_Video_NVIDIA.jpg",
//   price: 350000,
//   stock: 10,
// });

// gestorDeProductos.create({
//   title: "Monitor Samsung 24 pulgadas",
//   photo: "foto_Mon_Sam_24.jpg",
//   price: 150000,
//   stock: 30,
// });

// gestorDeProductos.create({
//   title: "Microprocesador AMD Ryzen 7",
//   photo: "foto_uP_Ryzen_7.jpg",
//   price: 250000,
//   stock: 5,
// });

// gestorDeProductos.create({
//   title: "Silla Gamer MID PLUS ROJA",
//   photo: "foto_Gamer_Roja.jpg",
//   price: 150000,
//   stock: 15,
// });

// gestorDeProductos.create({
//   title: "Mother Asus Prime A320M-K",
//   photo: "foto_Mother_A320M.jpg",
//   price: 185000,
//   stock: 50,
// });

// const newProd = {
//   id: 5,
//   title: "Mother Caquita Nacional",
//   photo: "foto_Caquita_Nacional.jpg",
//   price: 70000,
//   stock: 200,
// };

// console.log("Array de Productos:");
// console.log(gestorDeProductos.read());
// console.log("Producto buscado:");
// console.log(gestorDeProductos.readOne(1));
// console.log("Array actualizado:");
// gestorDeProductos.destroy(1);
//   gestorDeProductos.update(5, newProd);
// console.log("Array Reemplazado:");
//   console.log(gestorDeProductos.read());
