const http = require('http')
const router = require('./router.js')

const server = http.createServer(router);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`listening on port: http://localhost:${PORT}`);
});