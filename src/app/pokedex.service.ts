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
  private _pokemon: Pokemon | null = null;
  private _mainPokemonList: Promise<PokemonNameAndUrl[]> = this.initializeMainPokemonList();
  private _pokemonPerPage: number = 60;

  public async pokemonCardDetails(pokemonId: string|number) {
    const pokemon =  await firstValueFrom(this.http.get<Pokemon>(this._pokemonUrl + 'pokemon/' + pokemonId));
    const pokemonSpecies = await firstValueFrom(this.http.get<PokemonSpecies>(this._pokemonUrl + 'pokemon-species/' + pokemon.species.name));

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
    if(enGenera.length == 0) {
      return ''
    }
    return enGenera[0].genus;
  }

  public pokemonDescription(pokemonSpecies: PokemonSpecies) {
    const descriptions = pokemonSpecies.flavor_text_entries;
    const enDescriptions = this.filterEnglishText(descriptions);
    if(enDescriptions.length == 0) {
      return '-'
    }
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

    const pokemonMovesListDetails: {type: string; name: string; description: string}[] = []

    moves.forEach(move => {
      const url = move.move.url;
      this.getPokemonMove(url).subscribe({
        next: move => {
          pokemonMovesListDetails.push(this.getMoveDetails(move));
        }
      })
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

  public async initializeMainPokemonList() {
    const url = (limit: number) => `${this._pokemonUrl}pokemon/?limit=${limit}`;

    const limit = 1025;
    // Magic number.
    // The newer Pokemon have missing/extra details 
    // that I don't have time to account for.
    
    const entireListSearch = this.http.get<PokemonApiEmptySearch>(url(limit)).pipe(map(search => search.results));
    const entireList = await firstValueFrom(entireListSearch);
    return entireList;
  }

  public async getPokemonListByPage(page: number, pokemonPerPage: number = 60) {
    const list = await this._mainPokemonList;
    
    const offset = (page - 1) * pokemonPerPage;

    const pokemonListPage = list.filter((pokemon, index) => {
      return index >= offset && index < offset + pokemonPerPage;
    })
    
    return pokemonListPage;
  }

  public async getAllPokemonNames() {
    const list = await this._mainPokemonList;

    return list.map(p => p.name);
  }

  public async getPrevPokemonName(pokemonName: string) {
    const list = await this._mainPokemonList;

    const index = list.findIndex(pokemon => {
      return pokemon.name == pokemonName
    })

    if(list[index-1]) {
      return list[index-1].name;
    }
    return '';

  }

  public async getNextPokemonName(pokemonName: string) {
    const list = await this._mainPokemonList;
    
    const index = list.findIndex(pokemon => {
      return pokemon.name == pokemonName
    })

    if(list[index+1]) {
      return list[index+1].name;
    }

    return '';

  }

  public async getRandomPokemonName() {
    const list = await this._mainPokemonList;

    var randomPokemon = list[Math.floor(Math.random()*list.length)];
    return randomPokemon.name;
  }

  public async totalPages() {
    const list = await this._mainPokemonList;
    return Math.ceil(list.length / this._pokemonPerPage);
  }

  getPokemon(nameOrId: string | number) {
    const endpoint = `pokemon/${nameOrId}`
    return this.http.get<Pokemon>(this._pokemonUrl + endpoint)
  }

  private filterEnglishText<T extends MultipleLanguages>(arr: T[]) {
    let englishOnlyArr = arr.filter(ft => { return ft.language.name === this.language })
    return englishOnlyArr;
  }


}

interface MultipleLanguages {
  language: {
    name: string;
  }

}

interface PokemonApiEmptySearch {
  count: number;
  next: string;
  previous: string;
  results: PokemonNameAndUrl[];
}