const LaptopController = require('../controllers/LaptopController');

async function LaptopRoutes(server) {
	
	server.get('/laptops', LaptopController.getLaptopInfo);	
}

module.exports = LaptopRoutes;