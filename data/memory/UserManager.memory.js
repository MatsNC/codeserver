import crypto from "crypto";
export default class UserManager {
  static #users = [];
  //Method to create a new User:
  create(data) {
    try {
      const user = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        photo: data.photo || "photo_default.jpg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password) {
        throw new Error("User not created. Please enter email and password");
      } else {
        UserManager.#users.push(user);
        console.log("User created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to read Users List:
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No Users");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to find a user by id:
  readOne(id) {
    try {
      const findUser = UserManager.#users.find((user) => user.id === id);
      if (findUser !== undefined) {
        return findUser;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Method to destroy a user:
  destroy(id) {
    try {
      let destroyUser = this.readOne(id);
      if (!destroyUser) {
        throw new Error("User not found");
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

const oneUser = new UserManager();
oneUser.create({
  photo: "foto_usr1.jpg",
  email: "rodri_perez@gmail.com",
  password: "RoDP#5870*!",
  role: "Admin",
});

oneUser.create({
  photo: "foto_usr2.jpg",
  email: "matspind_45@gmail.com",
  password: "654!La3p2L1*",
  role: "Key User",
});

oneUser.create({
  photo: "foto_usr3.jpg",
  email: "maria@gmail.com",
  password: "L#2vF6Qz@",
  role: "Client",
});

oneUser.create({
  id: "123456789",
  photo: "foto_usr4.jpg",
  email: "juan_carlos@yahoo.com",
  password: "Gp5@jR9d!",
  role: "Admin",
});

console.log("List of Users:");
console.log(oneUser.read());
console.log("User found:");
console.log(oneUser.readOne("123456789"));
console.log("User deleted:");
console.log(oneUser.destroy("123456789"));
console.log("Updated List:");
console.log(oneUser.read());

