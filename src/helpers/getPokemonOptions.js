import pokemonapi from "../api/PokemonApi";

const getPokemons = () => {
    const pokemosArr = Array.from(Array(650))
    return pokemosArr.map((arg, index)=>index + 1)
};

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(()=> Math.random() - 0.5)
    const pokemons = await getPOkemonNames(mixedPokemons.splice(0, 4))
    return pokemons
};

const getPOkemonNames = async ([p1,p2,p3,p4]) => {
    const promiseArr = [
        await pokemonapi.get(`/${p1}`),
        await pokemonapi.get(`/${p2}`),
        await pokemonapi.get(`/${p3}`),
        await pokemonapi.get(`/${p4}`)
    ]
    const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all(promiseArr)

    return [
        {name: pokemon1.data.name, id: pokemon1.data.id},
        {name: pokemon2.data.name, id: pokemon2.data.id},
        {name: pokemon3.data.name, id: pokemon3.data.id},
        {name: pokemon4.data.name, id: pokemon4.data.id}
    ]
}
export default getPokemonOptions;