class ProductManager {
  static #productos = [];
  create(data) {
    try {
      const product = {
        id:
          ProductManager.#productos.length === 0
            ? 1
            : ProductManager.#productos[ProductManager.#productos.length - 1]
                .id + 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      if (!data.title) {
        throw new Error("No se pudo crear el producto");
      }
      else 
      {
        ProductManager.#productos.push(product);
        console.log("Producto Creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    return ProductManager.#productos;
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
  //Metodo para actualizar un producto cuyo id se pasa por parámetro
  update(id, product) {
    let prodReplace = this.readOne(id);
    ProductManager.#productos[prodReplace.id - 1] = product;
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

const newProd = {
  id: 5,
  title: "Mother Caquita Nacional",
  photo: "foto_Caquita_Nacional.jpg",
  price: 70000,
  stock: 200,
};

// console.log("Array de Productos:");
// console.log(gestorDeProductos.read());
// console.log("Producto buscado:");
// console.log(gestorDeProductos.readOne(1));
// console.log("Array actualizado:");
// gestorDeProductos.destroy(1);
gestorDeProductos.update(5, newProd);
// console.log("Array Reemplazado:");
console.log(gestorDeProductos.read());
/////////////////////////////

class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    UserManager.#users.push(user);
    console.log("Usuario Creado");
  }
  read() {
    return UserManager.#users;
  }
}

const gestorDeUsuario = new UserManager();
gestorDeUsuario.create({
  foto: "foto_usr1.jpg",
  email: "rodri_perez@gmail.com",
  password: "RoDP#5870*!",
  role: "Admin",
});

gestorDeUsuario.create({
  foto: "foto_usr2.jpg",
  email: "matspind_45@gmail.com",
  password: "654!La3p2L1*",
  role: "Key User",
});

//console.log(gestorDeUsuario.read());
