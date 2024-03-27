import express from 'express';
import indexRouter from './router/index.router.js';
import errorHandler from './middlewares/errorHandler.mid.js';
import pathHandler from './middlewares/pathHandler.mid.js';

const server = express();
const PORT = 8080;

const ready = () => console.log('server ready on port ' + PORT);

server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//endpoints
server.use('/', indexRouter);
server.use(errorHandler);
server.use(pathHandler);