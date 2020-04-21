var pokemons
var poke_imagens = {}

// Search
document.addEventListener('DOMContentLoaded', function() {
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=251')
		.then(response => {
			pokemons = response.data.results
			pokemons.forEach(poke=>poke_imagens[poke.name]='')
			console.log(poke_imagens)
		})
	var elems = document.querySelectorAll('.autocomplete');
	var instances = M.Autocomplete.init(elems, {});
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