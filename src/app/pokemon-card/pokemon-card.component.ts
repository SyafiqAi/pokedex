import { Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';
import { PokemonSpecies } from '../pokemon-species';
import { oshawott, oshawottSpecies } from '../data/oshawott'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  constructor(private pokedexService: PokedexService) { }

  name = ''
  picUrl = ''
  type = ''
  species = ''
  description = ''
  stats: any[] | null = null

  pokemonName = 'oshawott'
  ngOnInit() {
    // this.pokedexService.getPokemon(this.pokemonName).subscribe(pokemon => {
    //   this.assignProperties(pokemon);
    //   console.log(pokemon)
    // })
    // this.pokedexService.getPokemonSpecies(this.pokemonName).subscribe(pokemonSpecies => {
    //   console.log(pokemonSpecies)
    //   // const desc = pokemonSpecies.flavor_text_entries.filter(ft => {ft.language.name})[0].flavor_text
    //   // console.log('desc: ', desc)
    //   this.assignSpeciesProperties(pokemonSpecies)
    // })

    this.assignProperties(oshawott)
    this.assignSpeciesProperties(oshawottSpecies)
    
  }

  assignProperties(pokemon: Pokemon): void {
    this.name = pokemon.name;
    this.picUrl = pokemon.sprites.other['official-artwork'].front_default;
    this.type = pokemon.types[0].type.name;
    this.stats = pokemon.stats
  }
  
  assignSpeciesProperties(pokemonSpecies: PokemonSpecies): void {
    const language = 'en'

    this.description = pokemonSpecies.flavor_text_entries.filter(ft => {return ft.language.name === language})[0].flavor_text
    this.species = pokemonSpecies.genera.filter(gene => {return gene.language.name === language})[0].genus;
  }
}
