import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { PokemonSpecies } from './pokemon-species';
import { PokemonNameAndUrl } from './pokemon-name-and-url';
import { PokeapiResourceList } from './pokeapi-resource-list';

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

  private next = ''
  private prev = ''
  getPokemonList() {
  }

  getNextPokemonList(nextUrl: string) {
    if (nextUrl)
      return this.http.get<PokeapiResourceList>(nextUrl);
    else {
      const pokemonPerLoad = 60;
      const endpoint = `pokemon/?limit=${pokemonPerLoad}`;
      return this.http.get<PokeapiResourceList>(this.url + endpoint)    
    }
  }

}
