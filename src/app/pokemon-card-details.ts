import { Pokemon } from "./pokemon";
import { PokemonMove } from "./pokemon-move";

export interface PokemonCardDetails {
    types: string[];
    typeBgColor: string;
    officialArtworkUrl: string;
    name: string;
    genus: string;
    description: string;
    moves: {
        move: {
            name: string;
            url: string;
        }
    } []
}
