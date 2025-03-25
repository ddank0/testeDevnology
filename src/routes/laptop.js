const LaptopController = require('../controllers/LaptopController');

async function LaptopRoutes(server) {
	
	server.get('/api/laptops', LaptopController.getLaptopInfo);	
}

module.exports = LaptopRoutes;