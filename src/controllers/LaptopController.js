const ScrapeLaptopsService = require('../services/ScrapeLaptopsService');

async function getLaptopInfo(request, reply) {
    const { 
		page 		= 1, 
		size 		= 10, 
		search		= undefined , 
		all_data	= false, 
		sort		= 'asc', 
		id 			= undefined
	} = request.query; // Pega os parâmetros de paginação da query string

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(size, 10);

    const laptopInfo = await ScrapeLaptopsService.scrapeLaptops([search], sort, id);
	
    if (!laptopInfo) {
        reply.code(500).send({ error: 'Erro ao encontrar produtos' });
        return;
    }

	if (all_data || id) {
		return {
			total_itens: laptopInfo.length,
			data: laptopInfo
		}
	}

    const startIndex 	= (pageNumber - 1) * limitNumber;
    const endIndex 		= pageNumber * limitNumber;

    const paginatedData = laptopInfo.slice(startIndex, endIndex);

	let nextPage 		= pageNumber + 1;

	if (endIndex >= laptopInfo.length) {
    	nextPage 	= pageNumber;
	}
	
    const nextPageUrl 	= `${request.protocol}://${request.hostname}:${process.env.PORT || 3000}${request.url.split('?').shift()}?page=${nextPage}&limit=${limitNumber}`;

    return {
        total_itens: laptopInfo.length,
        page: pageNumber,
        size: limitNumber,
        next_page_url: nextPageUrl,
        data: paginatedData
    };
}

module.exports = {
    getLaptopInfo
};