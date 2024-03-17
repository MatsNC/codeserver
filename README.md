# codeserver
Repositorio de entregas - Curso Backend Coderhouse

# Segundo Desafío:
- Aspectos a incluir 
Gestores de “productos” y de “usuarios” para guardar los datos en la memoria (memory) y en archivos (files).
Definir cuatro usuarios y diez productos en memoria y en archivos.
Las clases ProductsManager y UsersManager de memory:
-create(data) agregar manejo de errores con try/catch
-read() agregar manejo de errores con try/catch
-readOne(id) debe retornar el recurso encontrado con el id, manejar errores con try/catch
-destroy(id) debe eliminar el recurso encontrado con el id y devolver el objeto eliminado, manejar errores con try/catch
Las clases ProductsManager y UsersManager de fs con los mismos métodos. Manejar errores con try/catch.

## Rama Dev
- En esta rama se hizo el Merge desde la rama sprint2.

## Rama Sprint2
- En esta rama se trabajó y luego se hizo el Merge en rama Dev. Acto seguido, fue eliminada

## Pasos para su utilización
- Clonar el repositorio con 
"git clone https://github.com/MatsNC/codeserver.git".
- Abrir el proyecto con VSC.
- Abrir una terminal en esa carpeta.
- Ejecutar "git checkout dev" para cambiar a rama dev.
- Ejecutar node ./data/fs/files/ProductManager.fs.js para usar la clase de los productos con manejo de archivos.
- node ./data/fs/files/UserManager.fs.js para usar la de los usuarios con manejo de archivos.
- node ./data/memory/ProductManager.memory.js para usar la clase de los productos en memoria. 
- node ./data/memory/UserManager.memory.js para usar la clase de los usuarios en memoria. 

# Autor:
Matías Nicolás Correa.
