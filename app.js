const pokedex = document.getElementById('pokedex')
console.log(pokedex)

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types
                .map(type => type.type.name)
                .join(', ')
        }));
        displayPokemon(pokemon)
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon)
    const pokemonHTMLString = pokemon.map(pokeMon => `
    <li>
        <img src ="${pokeMon.image}"/>
        <h2>${pokeMon.id}. ${pokeMon.name}</h2>
        <p>Type: ${pokeMon.type}
    </li>
    `).join(', ')
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();