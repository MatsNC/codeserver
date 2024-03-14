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

console.log(gestorDeUsuario.read());

module.exports = UserManager;