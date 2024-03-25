import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokedexService } from '../pokedex.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-thumbnail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pokemon-thumbnail.component.html',
  styleUrl: './pokemon-thumbnail.component.css'
})
export class PokemonThumbnailComponent {
  @Input() pokemonName!:string;
  pokemon: Pokemon | null = null
  picUrl = ''
  name = '';

  ngOnInit() {
    this.pokedexService.getPokemon(this.pokemonName).subscribe(value => {
      this.pokemon = value;
      // this.picUrl = this.pokemon.sprites.other['official-artwork'].front_default;
      this.picUrl = this.pokemon.sprites.front_default;
      this.name = this.pokemon.name;
    })
    
  }


  constructor(private pokedexService: PokedexService) { }
  
}
