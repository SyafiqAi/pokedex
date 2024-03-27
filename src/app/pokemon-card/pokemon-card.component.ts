import { Component, Input, SimpleChanges, effect } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';
import { PokemonSpecies } from '../pokemon-species';
import { oshawott, oshawottSpecies } from '../data/oshawott'
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonMovesListComponent } from '../pokemon-moves-list/pokemon-moves-list.component';
import { TextFormatterService } from '../text-formatter.service';
import { PokemonTypeIconComponent } from '../pokemon-type-icon/pokemon-type-icon.component';
import { PokemonTypeStylesService } from '../pokemon-type-styles.service';
import { PokemonTypeIconListComponent } from '../pokemon-type-icon-list/pokemon-type-icon-list.component';
import { PokemonTypes } from '../pokemon-types';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonMovesListComponent, PokemonTypeIconComponent, PokemonTypeIconListComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  constructor(private pokedexService: PokedexService, private route: ActivatedRoute, private textFormatterService: TextFormatterService, private pokemonStylesService: PokemonTypeStylesService) {
    this.styles = pokemonStylesService.styles
  }

  readonly language = 'en'
  @Input({ required: true }) pokemonId!: string;

  pokemon!: Pokemon
  pokemonSpecies: PokemonSpecies|null = null;
  speciesName = ''
  // stats: {stat:{name:string}, base_stat:number}[] = [];
  styles;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonId'].currentValue)
      this.makeCard();
  }
  
  makeCard() {
    this.pokedexService.getPokemon(this.pokemonId).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon = pokemon
        this.speciesName = pokemon.species.name;
        this.getPokemonSpecies();
      },
      error: (error: any) => {

        if (error.status === 404) {
          alert('Pokemon not found.')
        } else {
          alert('Something went wrong. Try again.');
        }
        console.log('error: ', error)

      }
    })
  }

  getPokemonSpecies() {
    this.pokedexService.getPokemonSpecies(this.speciesName).subscribe(
      pokemonSpecies => {
        this.pokemonSpecies = pokemonSpecies;
      }
    )
  }

  public get types() {
    if(this.pokemon) {
      let types = this.pokemon.types.map(type => {return type.type.name})
      if(types[0] == 'normal') {
        types = types.reverse();
      }
      // if possible show a non-normal color.
      // the normal color looks a bit bland.
  
      return types;
    } 
    return [''];
  }
  
  public get picUrl() {
    if(this.pokemon) {
      const picUrl = this.pokemon.sprites.other['official-artwork'].front_default || this.pokemon.sprites.other['official-artwork'].front_shiny;
      return picUrl;
    }
    return null;
  }

  public get typeBg() {
    if(this.types) {
      const type = this.types[0] as keyof typeof this.styles.bg
      const typeBg = this.styles.bg[type]
      return typeBg;
    }
    return this.styles.bg['normal'];
  }

  public get name () {
    if(this.pokemonSpecies) {
      const names = this.pokemonSpecies.names;
      const name = this.englishTextOnly(names)[0].name;
      return name;
    }
    return null;
  }
  
  public get genus() {
    if(this.pokemonSpecies) {
      const genera = this.pokemonSpecies.genera 
      const genus = this.englishTextOnly(genera)[0].genus;
      return genus;
    }
    return null;
  }
  
  public get description() {
    if(this.pokemonSpecies){
      const descriptions = this.pokemonSpecies.flavor_text_entries;
      let description = this.englishTextOnly(descriptions)[0].flavor_text;
      description = this.textFormatterService.removeUnwantedCharacters(description);
      return description;
    }
    return null;
  }
  
  private englishTextOnly<T extends multipleLanguages>(arr: T[]) {
    let englishOnlyArr = arr.filter(ft => { return ft.language.name === this.language })
    return englishOnlyArr;
  }
}

interface multipleLanguages {
  language: {
    name: string;
  }
  
}