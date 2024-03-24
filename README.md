# codeserver
Repositorio de entregas - Curso Backend Coderhouse

# Tercer Desafío:
- Endpoints de productos:
GET /api/products debe implementar el método read() para buscar todos los productos de fs. Agregar la query necesaria para filtrar por categoría:
Si el array tiene productos, enviar al cliente un objeto con las propiedades:
statusCode: 200
response: (el array)
Si el array no tiene elementos, enviar al cliente un objeto con las propiedades:
statusCode: 404
response: null
message: (mensaje descriptivo)
- GET /api/products/:pid debe implementar el método readOne(pid) para buscar un producto de fs:
Si se encuentra el producto, enviar al cliente un objeto con las propiedades:
statusCode: 200
response: (el objeto)
Si no se encuentra, enviar al cliente un objeto con las propiedades:
statusCode: 404
response: null
message: (mensaje descriptivo)
- Endpoints de usuarios:
GET /api/users debe implementar el método read() para buscar todos los usuarios de fs. Agregar la query necesaria para filtrar por rol:
Si el array tiene usuarios, enviar al cliente un objeto con las propiedades:
statusCode: 200
response: (el array)
Si el array no tiene elementos, enviar al cliente un objeto con las propiedades:
statusCode: 404
response: null
message: (mensaje descriptivo)
- GET /api/users/:uid debe implementar el método readOne(uid) para buscar un usuario de fs:
Si se encuentra el usuario, enviar al cliente un objeto con las propiedades:
statusCode: 200
response: (el objeto)
Si no se encuentra, enviar al cliente un objeto con las propiedades:
statusCode: 404
response: null
message: (mensaje descriptivo)


## Rama Dev
- En esta rama se hizo el Merge desde la rama sprint3.

## Rama Sprint3
- En esta rama se trabajó y luego se hizo el Merge en rama Dev. Acto seguido, fue eliminada

## Pasos para su utilización
- Clonar el repositorio con 
"git clone https://github.com/MatsNC/codeserver.git".
- Abrir el proyecto con VSC.
- Abrir una terminal en esa carpeta.
- Ejecutar "git checkout dev" para cambiar a rama dev.
- Ejecutar "npm install".
- Ejecutar "npm run dev".
- Abrir en el navegador "localhost:3500" con las rutas del proyecto (/, /api/products, api/users, /api/products/pid, /api/users/uid y las respectivas querys).

# Autor:
Matías Nicolás Correa.