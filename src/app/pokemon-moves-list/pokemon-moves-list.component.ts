import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { oshawott } from '../data/oshawott';
import { PokemonMove } from '../pokemon-move';
import { Pokemon } from '../pokemon';
import { TextFormatterService } from '../text-formatter.service';
import { PokemonTypeIconComponent } from '../pokemon-type-icon/pokemon-type-icon.component';

@Component({
  selector: 'app-pokemon-moves-list',
  standalone: true,
  imports: [CommonModule, PokemonTypeIconComponent],
  templateUrl: './pokemon-moves-list.component.html',
  styleUrl: './pokemon-moves-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonMovesListComponent {

  @Input({ required: true }) moves!: {move: {name: string; url: string;}}[];
  pokemonMoves: PokemonMoveDetails[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['moves'].currentValue) {
      this.makeMoveList();
    }
  }

  async makeMoveList() {
    this.pokemonMoves = await this.pokedexService.getPokemonMovesListDetails(this.moves);
  }

  constructor(private pokedexService: PokedexService) { }

}

interface PokemonMoveDetails {
 type: string;
 name: string;
 description: string;
}