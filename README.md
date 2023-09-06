# App Ecommerce
## Introduccion
La aplicacion es un back-end de un ecommerce
## Stack Tecnologico
La aplicacion se encuentra creada en el lenguaje **NodeJS** con su framework **[Express](https://expressjs.com/)**, esta
a su vez trabaja con una
base de datos **NoSQL [MongoDB](https://www.mongodb.com/docs/manual/)** que utiliza el
**ODM [Mongoose](https://mongoosejs.com/docs/guide.html)**.

- Arquitectura en capas
    - Data
    - Domain
    - Presentation
- Test unitarios y de integracion con Mocha
- Inyeccion de dependencias con awilix
- Dockerfile - docker-compose
- Seguridad con JWT
- Patrones de diseños
    - Singleton
    - Repository
    - Factory
- Entity
- Manejo de Middlewares
- Documentacion con Swagger
- Logger con PinoLogger

# Comandos de inicio
> Ingresar el siguiente comando para obtener el usuario admin.
```shell
npm run command -- addUser -e admin@admin.com -fn admin -ln admin -p 12345678 -a 32 -ia true
```
# Docker
## Docker Commands
> Construir imagen
```shell
docker build -t coder39740:1.2 .
```
> Listar las imágenes de docker
```shell
docker images
```
> Mostrar los procesos (contenedores) que se están ejecutando
```shell
docker ps -a
```
> Crear contendor y correrlo en el puerto 8081 con el nombre node_coder
```shell
docker run -p 8081:8081 --name node_coder -d coder39740:1.2
```
> Destruir el contenedor
```shell
docker rm node_coder
```
> Parar la ejecución del contenedor
```shell
docker stop node_coder
```
> Comenzar la ejecución del contenedor ya creado previamente
```shell
docker start node_coder
```
> Mostrar los logs del contenedor, para salir presionar Ctrl + C
```shell
docker logs -f node_coder
```
## Docker Compose
> Levantar los contenedores
```shell
docker-compose up
```
> Parar los contenedores
```shell
docker-compose stop
```
> Remover los contenedores
```shell
docker-compose down
```
