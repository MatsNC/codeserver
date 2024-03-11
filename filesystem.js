const fs = require('fs');

let ruta_de_archivo = './data.json'
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

function read_sync () {
    let file_content = fs.readFileSync(ruta_de_archivo,configuracion)
    console.log(contenido);
}

//////////////////////////////////

const check_file_async = (file_path) => {

}

const delete_file_async = (file_path) => {

}

const create_async = () => {

}

function read_async () {
    
}

create_sync();
read_sync();
check_file_sync(ruta_de_archivo);
delete_file_sync(ruta_de_archivo);
check_file_sync(ruta_de_archivo);
