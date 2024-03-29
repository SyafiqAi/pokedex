import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { PokemonSpecies } from './pokemon-species';
import { PokemonNameAndUrl } from './pokemon-name-and-url';
import { PokeapiResourceList } from './pokeapi-resource-list';
import { PokemonMove } from './pokemon-move';
import { combineLatestAll, endWith, iif, map, merge, mergeAll, mergeMap, pipe, toArray } from 'rxjs';
import { TextFormatterService } from './text-formatter.service';
import { PokemonTypeStylesService } from './pokemon-type-styles.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  constructor(private http: HttpClient, private textFormatter:TextFormatterService, private stylesService:PokemonTypeStylesService) { }

  readonly language = 'en'

  private _pokemonUrl = 'https://pokeapi.co/api/v2/';
  private _pokemonList: PokemonNameAndUrl[] = [];
  private _nextPageUrl: string = '';
  private _pokemonId: number = 0;
  private _pokemon: Pokemon | null = null;
  private _pokemonSpecies: PokemonSpecies | null = null;

  public setPokemonId(pokemonId: number) {
    return new Promise((resolve, reject): void => {
      this._pokemonId = pokemonId;

      this.http.get<Pokemon>(this._pokemonUrl + 'pokemon/' + pokemonId).subscribe(
        pokemon => {
          this._pokemon = pokemon;
          assignSpecies();
        }
      )
  
      const assignSpecies = () => {
        const endpoint = 'pokemon-species/' + this._pokemon?.name
        this.http.get<PokemonSpecies>(this._pokemonUrl + endpoint).subscribe(
          pokemonSpecies => {
            this._pokemonSpecies = pokemonSpecies
            resolve(null);
          }
        )
      }
  
    })
  }
  
  public set pokemonId(pokemonId: number) {
    this._pokemonId = pokemonId;

    this.http.get<Pokemon>(this._pokemonUrl + 'pokemon/' + pokemonId).subscribe(
      pokemon => {
        this._pokemon = pokemon;
        assignSpecies();
      }
    )

    const assignSpecies = () => {
      const endpoint = 'pokemon-species/' + this._pokemon?.name
      this.http.get<PokemonSpecies>(this._pokemonUrl + endpoint).subscribe(
        pokemonSpecies => {
          this._pokemonSpecies = pokemonSpecies
        }
      )
    }
  }

  // TODO set to private
  public get pokemon() {
    return this._pokemon;
  }

  public get officialArtworkUrl() {
    const url = this._pokemon?.sprites.other['official-artwork'].front_default
      || this._pokemon?.sprites.other['official-artwork'].front_shiny;
    return url;
  }

  public get pokemonName() {
    if (!this._pokemonSpecies) return null;
    const names = this._pokemonSpecies?.names
    const enNames = this.filterEnglishText(names)
    return enNames[0].name;
  }

  public get pokemonGenus() {
    if (!this._pokemonSpecies) return null;
    const generas = this._pokemonSpecies.genera
    const enGeneras = this.filterEnglishText(generas)
    return enGeneras[0].genus;
  }

  public get pokemonDescription() {
    if (!this._pokemonSpecies) return null;
    const descriptions = this._pokemonSpecies.flavor_text_entries;
    const enDescriptions = this.filterEnglishText(descriptions);
    const enDescription = this.textFormatter.removeUnwantedCharacters(enDescriptions[0].flavor_text)
    return enDescription;
  }

  public set pokemonList(nextList: PokemonNameAndUrl[]) {
    this._pokemonList.push(...nextList);
  }

  public updatePokemonList() {
    let url = '';

    if (this._nextPageUrl) {
      url = this._nextPageUrl;
    } else {
      const pokemonPerLoad = '60';
      const endpoint = `pokemon/?limit=${pokemonPerLoad}`;

      url = this._pokemonUrl + endpoint;
    }

    return new Promise((res, rej) => {
      this.http.get<PokeapiResourceList>(url).subscribe({
        next: nextList => {
          this._pokemonList.push(...nextList.results)
          this._nextPageUrl = nextList.next;
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

  getPokemon(nameOrId: string | number) {
    const endpoint = `pokemon/${nameOrId}`
    return this.http.get<Pokemon>(this._pokemonUrl + endpoint)
  }

  public get pokemonTypes() {
    if (!this._pokemon) return null;
    const types = this._pokemon.types.map(type => { return type.type.name });
    return types[0] == 'normal' ? types.reverse() : types;
  }

  public get pokemonTypeBgColor() {
    if (!this.pokemonTypes) {
      const normalTypeBgColor = this.stylesService.styles.bg.normal
      return normalTypeBgColor;
    }


    const mainType = this.pokemonTypes[0] as keyof typeof this.stylesService.styles.bg;
    const mainTypeBgColor = this.stylesService.styles.bg[mainType]
    return mainTypeBgColor;
  }

  toArrayOfPokemonTypeNames() {
    return pipe(
      map((pokemon: Pokemon) => { return pokemon.types }),
      mergeMap(types => iif(() => types[0].type.name === 'normal', this.reverse(types), types)),
      // if more than one type, put a non-normal type first, the normal color is a bit bland.
      map(type => { return type.type.name }),
      toArray()
    )
  }

  reverse<T>(arr: T[]) {
    const copy = [...arr];
    return copy.reverse();

  }

  getPokemonMove(moveUrl: string) {
    return this.http.get<PokemonMove>(moveUrl);
  }

  private filterEnglishText<T extends multipleLanguages>(arr: T[]) {
    let englishOnlyArr = arr.filter(ft => { return ft.language.name === this.language })
    return englishOnlyArr;
  }


}

interface multipleLanguages {
  language: {
    name: string;
  }

}