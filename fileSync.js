const fs = require("fs");

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