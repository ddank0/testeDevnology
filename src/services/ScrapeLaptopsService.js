const { HttpStatusCode } = require('axios');
const axios 	= require('axios');
const cheerio 	= require('cheerio');

const baseUrl 	= 'https://webscraper.io/test-sites/e-commerce/static/computers/laptops';

async function scrapeLaptops(searchTerms = [], sort = 'asc', searchId = undefined) {

	try {

		maxPage = await getMaxPage()
		if (!maxPage) {return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao encontrar ultima paginacao' });}

		let products 	 = [];
		let foundProduct = null
	
		for (let currentPage = 1; currentPage <= maxPage; currentPage++) {
	
			const response 	= await axios.get(`${baseUrl}?page=${currentPage}`);
			const $ 		= cheerio.load(response.data);
			
			$('.col-md-4').each((index, element) => {
	
				const title = $(element).find('.title').attr("title").trim();
				
				if (searchTerms.some(term => new RegExp(term, 'i').test(title)) || searchTerms.length === 0) {
					
					const price = parseFloat(
						$(element).find('.price').text().replace('$', '')
					);
					
					const id 			= $(element).find('.title').attr('href').split('/').pop();
					const link			= "https://webscraper.io" + $(element).find('.title').attr('href');
					const description 	= $(element).find('.description').text().trim();
					const rating 		= parseInt($(element).find('[data-rating]').attr('data-rating'));
					const reviews 		= parseInt($(element).find('.review-count').text().match(/\d+/)[0]);
					
					if(searchId !== undefined && searchId === id) {
						foundProduct = {
							id,
							title,
							price,
							description,
							rating,
							reviews,
							specifications: parseSpecifications(description),
							link
						};
						return  false
					}

					products.push({
						id,
						title,
						price,
						description,
						rating,
						reviews,
						specifications: parseSpecifications(description),
						link
					});
				}
			});
			
			if(foundProduct) {
				return [foundProduct]
			}
		}

		if (sort === 'desc') {
			return products.sort((a, b) => b.price - a.price);
		}

		return products.sort((a, b) => a.price - b.price);
	}
	catch (error){
		console.log(`Erro ao encontrar produtos ${error}`)
		return false
	}

}

async function getMaxPage() {
	try {

		const response	= await axios.get(`${baseUrl}`);
		const $ 		= cheerio.load(response.data);

		return $('.pagination .page-item:last').prev().text().trim();
	}
	catch {
		console.log("Erro ao encontrar ultima paginacao")
		return false
	}

}

function parseSpecifications(desc) {

    const specs = {};
    const parts = desc.split(',');

    if (parts.length == 5) {
        specs.screenSize 	= parts[0].trim();
        specs.processor 	= parts[1].trim();
        specs.ram 			= parts[2].trim();
        specs.storage 		= parts[3].trim();
        specs.os 			= parts[4].trim();
    }
	else if (parts.length > 5) {
		specs.screenSize 	= parts[1].trim();
		specs.processor 	= parts[2].trim();
		specs.ram 			= parts[3].trim();
		specs.storage 		= parts[4].trim();
		specs.os 			= parts[5].trim();
	}

    return specs;
}

module.exports = {
	scrapeLaptops
}
