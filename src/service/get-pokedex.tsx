import axios from "axios";
import { ResponsePokemons } from "../model/types";

export async function getPokedex<ResponsePokemons>() {

    try {
        const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";
        const reponse = await axios.get<ResponsePokemons>(API_URL);
        return reponse.data;
    } catch (error) {
        return error;
    }
}