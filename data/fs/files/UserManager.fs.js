import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
    this.init();
  }
  //Method to create a new Users file:
  init() {
    //fs.unlinkSync(this.path);
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const userArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, userArray);
      console.log("File created");
    } else {
      console.log("File already exists");
    }
  }
  //Method to create a new User:
  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error(
          "User not created. Please enter email and password"
        );
      } else {
        const user = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "photo_default.jpg",
          email: data.email,
          password: data.password,
          role: data.role,
        };

        let allUser = await fs.promises.readFile(this.path, "utf-8");
        allUser = JSON.parse(allUser);
        allUser.push(user);
        allUser = JSON.stringify(allUser, null, 2);
        await fs.promises.writeFile(this.path, allUser);
        console.log("User created successfully");
        return user;
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  //Method to read Users List from file:
  async read(role) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      if (role) {
        allUsers = allUsers.filter(u => u.role === role);
      }
      return allUsers;
    } catch (error) {
      console.log(error);
     
    }
  }

  //Method to find a user by id in the file:
  async readOne(id) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      let findUser = allUsers.find((each) => each.id === id);
      if (!findUser) {
        throw new Error("User not found");
      } else {
        console.log("User found: " + JSON.stringify(findUser, null, 2));
        return findUser;
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  //Method to destroy a user in the file:
  async destroy(id) {
    try {
      let destroyUser = await this.readOne(id);
      if (!destroyUser) {
        throw new Error("User not found");
      } else {
        let restOfUsers = await fs.promises.readFile(this.path, "utf-8");
        restOfUsers = JSON.parse(restOfUsers);
        restOfUsers = restOfUsers.filter((each) => each.id !== id);
        restOfUsers = JSON.stringify(restOfUsers, null, 2);
        await fs.promises.writeFile(this.path, restOfUsers);
        console.log(
          "User deleted: " + JSON.stringify(destroyUser, null, 2)
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
    const oneUser = new UserManager();
    // await oneUser.create({
    //   photo: "foto_usr1.jpg",
    //   email: "rodri_perez@gmail.com",
    //   password: "RoDP#5870*!",
    //   role: "Admin",
    // });

    // await oneUser.create({
    //   photo: "foto_usr2.jpg",
    //   email: "matspind_45@gmail.com",
    //   password: "654!La3p2L1*",
    //   role: "Key User",
    // });

    // await oneUser.create({
    //   photo: "foto_usr3.jpg",
    //   email: "maria@gmail.com",
    //   password: "L#2vF6Qz@",
    //   role: "Client",
    // });

    // await oneUser.create({
    //   id: "123456789",
    //   photo: "foto_usr4.jpg",
    //   email: "juan_carlos@yahoo.com",
    //   password: "Gp5@jR9d!",
    //   role: "Admin",
    // });
    // await oneUser.read();
    // await oneUser.readOne("123456789");
    // await oneUser.destroy("123456789");
  } catch (error) {
    console.log(error);
  }
}

test();

const Productos = new UserManager();
export default Productos;
