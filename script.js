const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

    else {
        pokemonName.innerHTML = 'MissingNo'
        pokemonNumber.innerHTML = 'NaN'
        pokemonImage.src = 'imagens/missingno.png'
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});


next.addEventListener('click', () => {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
});

prev.addEventListener('click', () => {
    if (searchPokemon>1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon)