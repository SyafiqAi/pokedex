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

  @Input({ required: true }) pokemon!: Pokemon;
  pokemonMoves: PokemonMoveReference[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'].currentValue) {
      this.pokemonMoves = this.pokemon.moves.map(m => {
        return { ...m, moveDetails: null as PokemonMove | null }
      })

      this.getAllMoveDetails();
    }
  }

  getAllMoveDetails() {
    this.pokemonMoves.forEach(move => {
      this.loadPokemonMove(move)
    })
  }

  loadPokemonMove(pokemonMove: PokemonMoveReference) {
    const url = (pokemonMove as PokemonMoveReference).move.url
    this.pokedexService.getPokemonMove(url).subscribe({
      next: (moveDetails: PokemonMove) => {
        return pokemonMove.moveDetails = moveDetails;
      }
    })
  }

  getFlavorTextEntry(move: PokemonMove) {
    const language = 'en'
    try {
      const text = move.flavor_text_entries?.filter(m => { return m.language.name == language })[0].flavor_text;
      const formattedText = this.textFormatterService.removeUnwantedCharacters(text);
      return formattedText;
    } catch (error) {
      return null
    }
  }

  getMoveName(move: PokemonMove) {
    const language = 'en'

    try {
      const text = move.names?.filter(m => { return m.language.name == language })[0].name;
      const formattedText = this.textFormatterService.removeUnwantedCharacters(text);
      return formattedText;
    } catch (error) {
      return null
    }
  }

  constructor(private pokedexService: PokedexService, private textFormatterService: TextFormatterService) { }

}

interface PokemonMoveReference {
  move: {
    name: string;
    url: string;
  },
  moveDetails: PokemonMove | null;
}