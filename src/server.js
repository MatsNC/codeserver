import express from 'express';
import indexRouter from './router/index.router.js';
import errorHandler from './middlewares/errorHandler.mid.js';
import pathHandler from './middlewares/pathHandler.mid.js';
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import __dirname from './utils.js';

const server = express();
const PORT = 8080;

const ready = () => console.log('server ready on port ' + PORT);
server.listen(PORT, ready);

//template engine
server.engine('handlebars',engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/src/views');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

//endpoints
server.use('/', indexRouter);
server.use(errorHandler);
server.use(pathHandler);