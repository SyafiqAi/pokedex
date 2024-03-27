import { Injectable } from '@angular/core';
import { PokemonTypes } from './pokemon-types';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeStylesService {

  private _styles:{bg:PokemonTypes, text:PokemonTypes} = {
    "bg": {
      "normal": "bg-normal",
      "bug": "bg-bug",
      "electric": "bg-electric",
      "fighting": "bg-fighting",
      "ghost": "bg-ghost",
      "psychic": "bg-psychic",
      "flying": "bg-flying",
      "steel": "bg-steel",
      "ice": "bg-ice",
      "poison": "bg-poison",
      "fire": "bg-fire",
      "dragon": "bg-dragon",
      "ground": "bg-ground",
      "water": "bg-water",
      "dark": "bg-dark",
      "rock": "bg-rock",
      "grass": "bg-grass",
      "fairy": "bg-fairy"
    },
    "text": {
      "normal": "text-normal",
      "bug": "text-bug",
      "electric": "text-electric",
      "fighting": "text-fighting",
      "ghost": "text-ghost",
      "psychic": "text-psychic",
      "flying": "text-flying",
      "steel": "text-steel",
      "ice": "text-ice",
      "poison": "text-poison",
      "fire": "text-fire",
      "dragon": "text-dragon",
      "ground": "text-ground",
      "water": "text-water",
      "dark": "text-dark",
      "rock": "text-rock",
      "grass": "text-grass",
      "fairy": "text-fairy"
    }

  }

  public get styles() {
    return this._styles;
  }
  constructor() { }
}
