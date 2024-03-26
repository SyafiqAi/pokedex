import { PokedexService } from '../pokedex.service';
import { Component } from '@angular/core';
import { PokemonThumbnailComponent } from '../pokemon-thumbnail/pokemon-thumbnail.component';
import { CommonModule } from '@angular/common';
import { PokemonNameAndUrl } from '../pokemon-name-and-url';
import { SentinelComponent } from '../sentinel/sentinel.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonThumbnailComponent, CommonModule, SentinelComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  providers: [PokedexService]
})
export class PokemonListComponent {

  sentinelMsg = 'loading...'
  pokemonList: PokemonNameAndUrl[] = this.pokedexService.pokemonList;
  next = ''
  constructor(private pokedexService: PokedexService) { }

  getNext() {
    this.pokedexService.updatePokemonList()
      .catch(err => {
        this.sentinelMsg = 'Something went wrong.'
      })
  }

}
