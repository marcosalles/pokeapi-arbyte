var pokemons
var poke_imagens = {}

// Search
document.addEventListener('DOMContentLoaded', function() {
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=251')
		.then(response => {
			pokemons = response.data.results;
			pokemons.forEach(poke=> {
				var split = poke.url.split('/');
				var numero = split[split.length-2];
				var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numero + '.png';
				poke_imagens[poke.name] = url;
			});
			console.log(poke_imagens)
		})
	var elems = document.querySelectorAll('.autocomplete');
	var instances = M.Autocomplete.init(elems, { data: poke_imagens });
});

function selecionarPokemon() {
	var input = document.querySelector('#autocomplete-input');
	axios.get(`https://pokeapi.co/api/v2/pokemon/${input.value}/`)
		.then(response => {
			document.querySelector('#nomePokemon').innerHTML = response.data.name.toUpperCase()
			response.data.abilities.map((ab,i) => {
				document.querySelector('#listaHabilidades').innerHTML = '<>'ab.ability.name
			})
		})
}

// Carousel
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.carousel');
	var instances = M.Carousel.init(elems, {'fullWidth':true, numVisible: 4});
});

/*
 autocomplete
 get todos pokemons https://pokeapi.co/api/v2/pokemon?limit=1000
*/