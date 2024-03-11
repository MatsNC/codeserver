const fs = require('fs');

let ruta_de_archivo = './data.json'
let ruta_de_archivo_mal = './data/data.json'
let contenido = JSON.stringify(
    {
        name: 'Pepe',
        age: 13,
        ocupation: 'Student',
    }
);

let configuracion = 'utf-8';

const check_file_sync = (file_path) => {
    let existe = fs.existsSync(file_path);
    console.log(existe);
}

const delete_file_sync = (file_path) => {
    fs.unlinkSync(file_path);
}

const create_sync = () => {
    fs.writeFileSync(ruta_de_archivo, contenido);
    console.log("Writing...");
}

function read_sync() {
    let file_content = fs.readFileSync(ruta_de_archivo, configuracion)
    console.log(contenido);
}

//////////////////////////////////

const delete_file_cb = async (file_path) => {
    fs.unlink(file_path, (error) => {
        if (error) {
            console.log('ocurrio un error ');
        }
    })
}

const create_cb = (file_path) => {
    fs.writeFile(file_path, contenido, (error) => {
        if (error) {
            console.log('ocurrio un error ');
        }
    })
}

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

const create_promises = (file_path) => {
    fs.promises.writeFile(file_path, contenido)
        .then(res => console.log('todo ok'))
        .catch(error => console.log('todo mal'))
}



// create_sync();
// read_sync();
// check_file_sync(ruta_de_archivo);
// delete_file_sync(ruta_de_archivo);
// check_file_sync(ruta_de_archivo);
// create_cb(ruta_de_archivo);
// read_cb(ruta_de_archivo);
// delete_file_cb(ruta_de_archivo);
create_promises(ruta_de_archivo);