import { PokedexService } from '../pokedex.service';
import { Component } from '@angular/core';
import { PokemonThumbnailComponent } from '../pokemon-thumbnail/pokemon-thumbnail.component';
import { CommonModule } from '@angular/common';
import { PokemonNameAndUrl } from '../pokemon-name-and-url';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonThumbnailComponent, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  pokemonList: PokemonNameAndUrl[] = [];
  next = ''
  loading = false;
  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    this.getNext()
  }

  getNext() {
    this.loading = true;
    this.pokedexService.getNextPokemonList(this.next).subscribe(nextList => {
      this.pokemonList.push(...nextList.results)
      this.next = nextList.next;
      this.loading = false;
    })
  }

}
