import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { PokemonSpecies } from './pokemon-species';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  constructor(private http:HttpClient) { }

  private url = 'https://pokeapi.co/api/v2/'


  getPokemon(nameOrId: string|number) {
    const endpoint = `pokemon/${nameOrId}`
    return this.http.get<Pokemon>(this.url + endpoint)
  }
  
  getPokemonSpecies(nameOrId: string|number) {
    const endpoint = `pokemon-species/${nameOrId}`
    return this.http.get<PokemonSpecies>(this.url + endpoint)
  }

}
