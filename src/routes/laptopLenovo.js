const LaptopController = require('../controllers/LaptopLenovoController');

async function LaptopLenovoRoutes(server) {
	
	server.get('/api/laptops-lenovo', LaptopController.getLaptopLenovoInfo);	
}

module.exports = LaptopLenovoRoutes;