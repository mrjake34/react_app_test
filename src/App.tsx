import { useEffect, useState } from "react";
import { Pokemon, ResponsePokemons } from "./model/types";
import { getPokedex } from "./service/get-pokedex";
import axios from "axios";
import { PokemonDetails } from "./model/pokemon-details";

function App() {

    const [responsePokemons, setPokemons] = useState<ResponsePokemons>();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>();

    const getPokemons = async () => {
        try {
            const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";
            const reponse = await axios.get<ResponsePokemons>(API_URL);
            setPokemons(reponse.data);

        } catch (error) {
            console.log(error);
        }
    }

    const getPokemonDetails = async (url: string) => {
        try {
            const reponse = await axios.get<PokemonDetails>(url);
            setPokemon(reponse.data);
            console.log(reponse.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPokemons();

    }, []);

    if (responsePokemons) {
        console.log(responsePokemons);
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Pokemon Listesi */}
            <div style={{ flex: 1 }}>
                <h1>Lista de Pokemons</h1>
                <ul>
                    {responsePokemons?.results.map((pokemon: Pokemon) => (
                        <li key={pokemon.name}>
                            <a href={pokemon.url} onClick={(e) => { e.preventDefault(); getPokemonDetails(pokemon.url); }}>
                                {pokemon.name}
                            </a>

                        </li>
                    ))}
                </ul>
            </div>

            {/* Yan tarafta açılan alan (Modal veya Side Menu) */}
            {pokemon && (
                <div style={{ width: '300px', backgroundColor: 'lightgray', padding: '16px' }}>
                    <h2>Detaylar</h2>
                    {/* Burada seçilen Pokemon'un detaylarını göstermek için gerekli içeriği ekleyebilirsiniz */}
                    <p>Name: {pokemon.name}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Base Experience: {pokemon.base_experience}</p>
                    <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                    <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                    <p>Stats: {pokemon.stats.map((stat) => stat.stat.name).join(', ')}</p>
                    <button onClick={() => setPokemon(null)}>Kapat</button>
                </div>
            )}
        </div>
    );
}

export default App;