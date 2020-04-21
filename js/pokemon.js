// Search
document.addEventListener('DOMContentLoaded', function() {
	const axios = require('axios');
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=251')
	var elems = document.querySelectorAll('.autocomplete');
	var instances = M.Autocomplete.init(elems, options);
});

// Carousel
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.carousel');
	var instances = M.Carousel.init(elems, {'fullWidth':true, numVisible: 4});
});

/*
 autocomplete
 get todos pokemons https://pokeapi.co/api/v2/pokemon?limit=1000
*/