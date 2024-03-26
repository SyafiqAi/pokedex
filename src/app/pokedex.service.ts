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

  private _pokemonUrl = 'https://pokeapi.co/api/v2/'
  private _pokemonList: PokemonNameAndUrl[] = [];
  private _next: string = ''

  public set pokemonList(nextList: PokemonNameAndUrl[]) {
    this._pokemonList.push(...nextList)
  }

  public updatePokemonList() {
    let url = '';

    if (this._next){
      url = this._next;
    } else {
      const pokemonPerLoad = '60';
      const endpoint = `pokemon/?limit=${pokemonPerLoad}`;

      url = this._pokemonUrl + endpoint;
    }

    return new Promise((res,rej) => {
      this.http.get<PokeapiResourceList>(url).subscribe({
        next: nextList => {
          this._pokemonList.push(...nextList.results)
          this._next = nextList.next;
        },
        error: error => {
          rej(error)
        }
      })
    });
  }

  public get pokemonList() {
    return this._pokemonList;
  }


  getPokemon(nameOrId: string|number) {
    const endpoint = `pokemon/${nameOrId}`
    return this.http.get<Pokemon>(this._pokemonUrl + endpoint)
  }
  
  getPokemonSpecies(nameOrId: string|number) {
    const endpoint = `pokemon-species/${nameOrId}`
    return this.http.get<PokemonSpecies>(this._pokemonUrl + endpoint)
  }

}
