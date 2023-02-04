const URL = "htpps://pokeapi.co/api/v2/pokemon?limit=150"

const pokeContainer = document.getElementById('poke-container')
const pokemonCount = 150

const colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}

const main_types = Object.keys(colors)

const fetchPokemon = async () => {
    for (let j = 1; j <= pokemonCount; j++) {
        await getPokemon(j)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const id = pokemon.id.toString().padStart(3, '0')
    const type = pokemon.types[0].type.name

    const pokemonInnerHTML = `
    <div class="image-container">
        <img src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png>
    </div>
    <div class="info">
        <span class="number">${id}</span>
        <h3 class="name">${pokemon.name}</h3>
        <small class="type">Type <span>${type}</span></small>
    </div>
    `
    pokemonEl.style.backgroundColor = colors[type]
    pokemonEl.innerHTML = pokemonInnerHTML


    pokeContainer.appendChild(pokemonEl)
}

fetchPokemon()