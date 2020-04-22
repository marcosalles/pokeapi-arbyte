var pokemons
var poke_imagens = {}

// Search
document.addEventListener('DOMContentLoaded', function() {
	startModal() //Chamando função para inicializar o modal da seção "sobre"
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=251')
		.then(response => {
			pokemons = response.data.results;
			var primeiroPkmn = pokemons[Math.floor(Math.random()*pokemons.length)];
			pokemons.forEach(poke=> {
				var split = poke.url.split('/');
				var numero = split[split.length-2];
				var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numero + '.png';
				poke_imagens[poke.name] = url;
			});
			selecionarPokemon(primeiroPkmn.name);
		});
	var elems = document.querySelectorAll('.autocomplete');
	var instances = M.Autocomplete.init(elems, { data: poke_imagens });
});

function apertaBotao() {
	var input = document.querySelector('#autocomplete-input');
	selecionarPokemon(input.value);
}

function selecionarPokemon(name) {
	axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
		.then(response => {
			var pokemon = response.data.name;
			document.querySelector('#nomePokemon').innerHTML = pokemon.toUpperCase();
			var lista = document.querySelector('#listaHabilidades');
			var habilidades = response.data.abilities.map(ab => `<p>${ab.ability.name}</p>`);
			lista.innerHTML = habilidades.join('');
			var imagem = poke_imagens[pokemon];
			document.querySelector('#pokeImage').src = imagem;
			var tipos = response.data.types.map(t => t.type.name);
			document.querySelector('#listaTipos').innerHTML = tipos.join(', ');
			axios.get(`https://pokeapi.co/api/v2/type/${tipos[0]}`)
				.then(response =>{
					var exibe_carousel = response.data.pokemon.slice(0,10);
					links = exibe_carousel.map(elm => {
						textoLink =
							`<a class="carousel-item" href="#" onclick="selecionarPokemon('${elm.pokemon.name}')">
								<img src="${poke_imagens[elm.pokemon.name]}">
							</a>`;
						return textoLink
					})
					document.querySelector('#carouselSimilares').innerHTML = links.join('');
					startCarousel();
				})
		})
}

// Carousel
function startCarousel() {
	var elems = document.querySelectorAll('.carousel');
	var instances = M.Carousel.init(elems, {'fullWidth': true, numVisible: 4});
};

//Inicializa o nosso modal
function startModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  }

/*
 autocomplete
 get todos pokemons https://pokeapi.co/api/v2/pokemon?limit=1000
*/