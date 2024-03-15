const UserManager = require('./data/memory/UserManager.memory.js');
let user = new UserManager();

function router(req, res) {
  const url = req.url;
  console.log(url);
  const options = { "Content-Type": "text/plain" };
  switch (url) {
    case "/":
      res.writeHead(200, options).end("API CONECTADA");
      break;
    case "/home":
        res.writeHead(200, options).end("HOME");
        break
    // case "/users":
    //     res.writeHead(200, options).end("USUARIOS");
    //     break;    
    case "/api/users":
        user = user.read();
        user = JSON.stringify(user);
        res.writeHead(200, options).end(user);
        break;    
    default:
        res.writeHead(404, options).end("RUTA NO ENCONTRADA");
      break;
  }
}

module.exports = router;
