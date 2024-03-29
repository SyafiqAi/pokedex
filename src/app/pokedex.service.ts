import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { PokemonSpecies } from './pokemon-species';
import { PokemonNameAndUrl } from './pokemon-name-and-url';
import { PokeapiResourceList } from './pokeapi-resource-list';
import { PokemonMove } from './pokemon-move';
import { combineLatestAll, endWith, firstValueFrom, iif, map, merge, mergeAll, mergeMap, pipe, toArray } from 'rxjs';
import { TextFormatterService } from './text-formatter.service';
import { PokemonTypeStylesService } from './pokemon-type-styles.service';
import { PokemonCardDetails } from './pokemon-card-details';

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

  public async pokemonCardDetails(pokemonId: string|number) {
    const url = (endpoint:string) => {return this._pokemonUrl + endpoint + pokemonId}
    const p =  firstValueFrom(this.http.get<Pokemon>(url('pokemon/')));
    const pSpecies = firstValueFrom(this.http.get<PokemonSpecies>(url('pokemon-species/')));
    const [pokemon, pokemonSpecies] = await Promise.all(([p,pSpecies]));

    const pokemonCardDetails = this.assignPokemonCardDetails(pokemon, pokemonSpecies);
    
    return pokemonCardDetails;
  }
  
  private assignPokemonCardDetails(pokemon: Pokemon, pokemonSpecies: PokemonSpecies) {
    const name = this.pokemonName(pokemonSpecies);
    const genus = this.pokemonGenus(pokemonSpecies)
    const types = this.pokemonTypes(pokemon);
    const typeBgColor = this.pokemonTypeBgColor(types[0]);
    const officialArtworkUrl = this.officialArtworkUrl(pokemon)
    const description = this.pokemonDescription(pokemonSpecies);
    const moves = this.pokemonMoves(pokemon)
  
    const pokemonCardDetails: PokemonCardDetails = {
      name: name,
      genus: genus,
      types: types,
      typeBgColor: typeBgColor,
      officialArtworkUrl: officialArtworkUrl,
      description: description,
      moves: moves,
    }
    
    return pokemonCardDetails;

  }

  public pokemonName(pokemonSpecies: PokemonSpecies) {
      const names = pokemonSpecies.names
      const enNames = this.filterEnglishText(names)
      return enNames[0].name;
  }  
  
  public pokemonGenus(pokemonSpecies: PokemonSpecies) {
    const genera = pokemonSpecies.genera
    const enGenera = this.filterEnglishText(genera)
    return enGenera[0].genus;
  }

  public pokemonDescription(pokemonSpecies: PokemonSpecies) {
    const descriptions = pokemonSpecies.flavor_text_entries;
    const enDescriptions = this.filterEnglishText(descriptions);
    const enDescription = this.textFormatter.removeUnwantedCharacters(enDescriptions[0].flavor_text)
    return enDescription;
  }

  public pokemonTypes(pokemon: Pokemon) {
    const types = pokemon.types.map(type => { return type.type.name });
    return types[0] == 'normal' ? types.reverse() : types;
  }
  
  public pokemonTypeBgColor(pokemonType: string) {
    const type = pokemonType as keyof typeof this.stylesService.styles.bg;
    const mainTypeBgColor = this.stylesService.styles.bg[type]
    return mainTypeBgColor;
  }

  public officialArtworkUrl(pokemon: Pokemon) {
    const officialArtwork = pokemon.sprites.other['official-artwork'];
    const url = officialArtwork.front_default || officialArtwork.front_shiny;
    return url;
  }

  public pokemonMoves(pokemon: Pokemon) {
    return pokemon.moves;
  }

  public async getPokemonMovesListDetails(moves: {move: {name: string; url: string;}}[]) {

    const movesPromiseList: Promise<PokemonMove>[] = []
    
    moves.forEach(move => {
      const url = move.move.url;
      movesPromiseList.push(firstValueFrom(this.getPokemonMove(url)))
    })

    const allPokemonMoves = await Promise.all(movesPromiseList)

    const pokemonMovesListDetails: {type: string; name: string; description: string}[] = []

    allPokemonMoves.forEach(move => {
      pokemonMovesListDetails.push(this.getMoveDetails(move));
    })
    
    return pokemonMovesListDetails;
    
  }

  getPokemonMove(moveUrl: string) {
    return this.http.get<PokemonMove>(moveUrl);
  }

  getMoveDetails(move: PokemonMove) {
    const type = move.type.name;
    const name = this.getMoveName(move);
    const description = this.getMoveDescription(move);

    const moveDetails = {
      type: type,
      name: name,
      description: description
    }

    return moveDetails;
  }
  
  getMoveName(move: PokemonMove) {
    const names = move.names;
    const enNames = this.filterEnglishText(names);
    const enName = enNames[0].name;

    return enName;
  }

  getMoveDescription(move: PokemonMove) {
    const descriptions = move.flavor_text_entries;
    const enDescriptions = this.filterEnglishText(descriptions);
    if (!enDescriptions[0]) return '-' // some moves don't have a description.
    
    const enDescription = enDescriptions[0].flavor_text;
    
    return enDescription;
  }

  // TODO set to private
  public get pokemon() {
    return this._pokemon;
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