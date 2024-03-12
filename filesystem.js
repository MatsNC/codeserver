const fs = require("fs");

let ruta_de_archivo = "./data.json";
let ruta_de_archivo_mal = "./data/data.json";

let array_Content = [];

let contenido = {
  name: "Carlito",
  age: 13,
  ocupation: "Student",
};

let datos_agregados = {
  name: "Querido",
  age: 189,
  ocupation: "Dios",
};

array_Content.push(contenido);
array_Content.push(datos_agregados);

let configuracion = "utf-8";

const check_file_sync = (file_path) => {
  let existe = fs.existsSync(file_path);
  console.log(existe);
};

const delete_file_sync = (file_path) => {
  fs.unlinkSync(file_path);
};

const create_sync = (file_path) => {
  fs.writeFileSync(file_path, JSON.stringify(array_Content));
  console.log("Writing...");
};

function read_sync(file_path) {
  let file_content = fs.readFileSync(file_path, configuracion);
  console.log(JSON.parse(file_content));
}

//////////////////////////////////

const delete_file_cb = async (file_path) => {
  fs.unlink(file_path, (error) => {
    if (error) {
      console.log("ocurrio un error ");
    } else {
      console.log("Eliminado");
    }
  });
};

const create_cb = (file_path) => {
  fs.writeFile(file_path, contenido, (error) => {
    if (error) {
      console.log("ocurrio un error ");
    }
  });
};

function read_cb(file_path) {
  fs.readFile(file_path, configuracion, (error, res) => {
    if (error) {
      return error;
    }
    console.log(res);
    return res;
  });
}

//////////////////////////////////////////////

const create_promises_sync = (file_path) => {
  fs.promises
    .writeFile(file_path, contenido)
    .then((res) => console.log("todo ok"))
    .catch((error) => console.log("todo mal"));
};

const create_promises_async = async (file_path) => {
  await fs.promises.writeFile(file_path, contenido);
  console.log("Archivo creado correctamente");
};

const append_promises_async = async (file_path) => {
  let respuesta = await fs.promises.appendFile(file_path, datos_agregados);
  console.log("Se agregan mas datos ");
  return respuesta;
};

// create_sync();
// read_sync();
// check_file_sync(ruta_de_archivo);
// delete_file_sync(ruta_de_archivo);
// check_file_sync(ruta_de_archivo);
// create_cb(ruta_de_archivo);

create_sync(ruta_de_archivo);
//read_cb(ruta_de_archivo);
read_sync(ruta_de_archivo);
