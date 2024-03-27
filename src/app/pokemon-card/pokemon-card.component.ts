import { Component, effect } from '@angular/core';
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


  pokemon!: Pokemon
  name = ''
  speciesName = ''
  picUrl = ''
  types = ['']
  genus = ''
  description = ''
  // stats: {stat:{name:string}, base_stat:number}[] = [];
  typeColor = ''
  typeBg = ''
  styles;


  pokemonId = ''
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.pokemonId = String(routeParams.get('pokemonId'));

    this.pokedexService.getPokemon(this.pokemonId).subscribe({
      next: (pokemon: Pokemon) => {
        this.assignProperties(pokemon)
        this.pokemon = pokemon;
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
    this.types = pokemon.types.map(type => {return type.type.name})

    // if possible show non-normal color.
    // the normal color looks a bit bland.
    if(this.types[0] == 'normal') {
      this.types = this.types.reverse();
    }
    this.typeColor = this.types[0];
    this.typeBg = (this.styles.bg as any)[this.types[0]]
  }

  assignSpeciesProperties(pokemonSpecies: PokemonSpecies): void {
    const language = 'en'

    this.description = pokemonSpecies.flavor_text_entries.filter(ft => { return ft.language.name === language })[0].flavor_text
    this.genus = pokemonSpecies.genera.filter(gene => { return gene.language.name === language })[0].genus;
    this.name = pokemonSpecies.names.filter(name => { return name.language.name === language })[0].name;
    this.formatText();
  }

  formatText() {
    this.description = this.textFormatterService.removeUnwantedCharacters(this.description)
  }
  
}
