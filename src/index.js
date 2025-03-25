const fastify 		= require('fastify');
const server 		= fastify();
const LaptopRoutes	= require('./routes/laptop');
const cors			= require('@fastify/cors');
const formbody		= require('@fastify/formbody');
const LaptopLenovoRoutes = require('./routes/laptopLenovo');

const corsOptions = {
	credentials: true,
	origin: /localhost\:8000/,//alterar para o endereço do front
}

server.register(cors, corsOptions);
server.register(formbody);

//Routes
server.register(LaptopRoutes);
server.register(LaptopLenovoRoutes);


server.listen({
	port: process.env.PORT || 3000,
})
console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
