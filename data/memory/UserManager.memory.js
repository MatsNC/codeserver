const crypto = require("crypto");
class UserManager {
  static #users = [];
  //Metodo para crear un Usuario:
  create(data) {
    try {
      const user = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        photo: data.photo || "foto_default.jpg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password) {
        throw new Error(
          "No se pudo crear el usuario. Ingrese email y password"
        );
      } else {
        UserManager.#users.push(user);
        console.log("Usuario Creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para leer listado de usuarios:
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No hay productos cargados");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para leer un usuario en especifico:
   readOne(id) {
    try {
      const findUser = UserManager.#users.find((user) => user.id === id);
      if (findUser !== undefined) {
        return findUser;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para borrar un usuario:
  destroy(id) {
    try {
      let destroyUser = this.readOne(id);
      if (!destroyUser) {
        throw new Error("Usuario no encontrado");
      } else {
        const newArray = UserManager.#users.filter((user) => user.id !== id);
        UserManager.#users = newArray;
        return destroyUser;
      }
    } catch (error) {
      console.log(error);
    }
  } 
}

const gestorDeUsuario = new UserManager();
gestorDeUsuario.create({
  photo: "foto_usr1.jpg",
  email: "rodri_perez@gmail.com",
  password: "RoDP#5870*!",
  role: "Admin",
});

gestorDeUsuario.create({
  photo: "foto_usr2.jpg",
  email: "matspind_45@gmail.com",
  password: "654!La3p2L1*",
  role: "Key User",
});

gestorDeUsuario.create({
  photo: "foto_usr3.jpg",
  email: "maria@gmail.com",
  password: "L#2vF6Qz@",
  role: "Client"
});

gestorDeUsuario.create({
  id: "123456789",
  photo: "foto_usr4.jpg",
  email: "juan_carlos@yahoo.com",
  password: "Gp5@jR9d!",
  role: "Admin"
});

console.log("Listado de Usuarios:");
console.log(gestorDeUsuario.read());
console.log("Usuario buscado:");
console.log(gestorDeUsuario.readOne("123456789"));
console.log("Usuario borrado:");
console.log(gestorDeUsuario.destroy("123456789"));
console.log("Listado actualizado:");
console.log(gestorDeUsuario.read());