import { Component, effect } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';
import { PokemonSpecies } from '../pokemon-species';
import { oshawott, oshawottSpecies } from '../data/oshawott'
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  constructor(private pokedexService: PokedexService, private route: ActivatedRoute) { }

  name = ''
  speciesName = ''
  picUrl = ''
  type = ['']
  genus = ''
  description = ''
  stats: {stat:{name:string}, base_stat:number}[] = [];

  pokemonName = ''
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.pokemonName = String(routeParams.get('pokemonName'));

    this.pokedexService.getPokemon(this.pokemonName).subscribe({
      next: (pokemon: Pokemon) => {
        this.assignProperties(pokemon)

        this.speciesName = pokemon.species.name;
        this.getPokemonSpecies();
      },
      error: (error: any) => {

        if(error.status === 404) {
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
        this.assignSpeciesProperties(pokemonSpecies)
      }
    )
  }

  assignProperties(pokemon: Pokemon): void {
    this.picUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.other['official-artwork'].front_shiny;
    this.type = pokemon.types.map(type => {return type.type.name})
    this.stats = pokemon.stats
  }

  assignSpeciesProperties(pokemonSpecies: PokemonSpecies): void {
    const language = 'en'

    this.description = pokemonSpecies.flavor_text_entries.filter(ft => { return ft.language.name === language })[0].flavor_text
    this.genus = pokemonSpecies.genera.filter(gene => { return gene.language.name === language })[0].genus;
    this.name = pokemonSpecies.names.filter(name => { return name.language.name === language })[0].name;
  }
}
