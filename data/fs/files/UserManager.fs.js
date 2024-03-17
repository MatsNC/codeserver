const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
    this.init();
  }
  //Metodo para crear archivo de usuarios:
  init() {
    fs.unlinkSync(this.path);
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const userArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, userArray);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya existe");
    }
  }
  //Metodo para crear un usuario:
  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error(
          "No se pudo crear el usuario. Ingrese email y password"
        );
      } else {
        const user = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "foto_default.jpg",
          email: data.email,
          password: data.password,
          role: data.role,
        };

        let allUser = await fs.promises.readFile(this.path, "utf-8");
        allUser = JSON.parse(allUser);
        allUser.push(user);
        allUser = JSON.stringify(allUser, null, 2);
        await fs.promises.writeFile(this.path, allUser);
        console.log("Usuario creado");
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para leer listado de usuarios desde archivo:
  async read() {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      if (allUsers.length === 0) {
        throw new Error("No hay usuarios cargados");
      } else {
        console.log("Lista de Usuarios: " + JSON.stringify(allUsers, null, 2));
        //console.log(allUsers);
        return allUsers;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para encontrar un usuario por id en archivo:
  async readOne(id) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      let findUser = allUsers.find((each) => each.id === id);
      if (!findUser) {
        throw new Error("Usuario no encontrado");
      } else {
        console.log("Usuario encontrado: " + JSON.stringify(findUser, null, 2));
        return findUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para eliminar un usuario del archivo:
  async destroy(id) {
    try {
      let destroyUser = await this.readOne(id);
      if (!destroyUser) {
        throw new Error("Usuario no encontrado");
      } else {
        let restOfUsers = await fs.promises.readFile(this.path, "utf-8");
        restOfUsers = JSON.parse(restOfUsers);
        restOfUsers = restOfUsers.filter((each) => each.id !== id);
        restOfUsers = JSON.stringify(restOfUsers, null, 2);
        await fs.promises.writeFile(this.path, restOfUsers);
        console.log(
          "Usuario eliminado: " + JSON.stringify(destroyUser, null, 2)
        );
        return destroyUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    const gestorDeUsuario = new UserManager();
    await gestorDeUsuario.create({
      photo: "foto_usr1.jpg",
      email: "rodri_perez@gmail.com",
      password: "RoDP#5870*!",
      role: "Admin",
    });

    await gestorDeUsuario.create({
      photo: "foto_usr2.jpg",
      email: "matspind_45@gmail.com",
      password: "654!La3p2L1*",
      role: "Key User",
    });

    await gestorDeUsuario.create({
      photo: "foto_usr3.jpg",
      email: "maria@gmail.com",
      password: "L#2vF6Qz@",
      role: "Client",
    });

    await gestorDeUsuario.create({
      id: "123456789",
      photo: "foto_usr4.jpg",
      email: "juan_carlos@yahoo.com",
      password: "Gp5@jR9d!",
      role: "Admin",
    });
    await gestorDeUsuario.read();
    await gestorDeUsuario.readOne("123456789");
    await gestorDeUsuario.destroy("123456789");
  } catch (error) {
    console.log(error);
  }
}

test();
