import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Input } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { oshawott } from '../data/oshawott';
import { PokemonMove } from '../pokemon-move';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-moves-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-moves-list.component.html',
  styleUrl: './pokemon-moves-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonMovesListComponent {

  @Input({required: true}) pokemon!: Pokemon;
  pokemonMoves: any;

  color = 'pink'
  swiperStyles = {
    '--swiper-pagination-color': this.color,
    '--swiper-pagination-bullet-inactive-color': 'white',
    '--swiper-pagination-bullet-inactive-opacity': '0.2',
    '--swiper-navigation-color': this.color,
  }

  pokemonMovesLoaded = 0;
  pokemonMovesPerSlide = 2;
  
  ngOnInit() {
    this.pokemonMoves = this.pokemon.moves.map((m:PokemonMoveReference) => {
      return { ...m, moveDetails: (null as PokemonMove|null) }
    })
    const currentSlide = 1;
    this.loadSlides(currentSlide)
  }

  handleSlideChange(event: Event) {
    const currentIndex = (event as CustomEvent).detail[0].activeIndex
    const currentSlide = currentIndex + 1;

    this.loadSlides(currentSlide);
  }

  loadSlides(slideInView: number) {
    let slidesLoaded = this.pokemonMovesLoaded / this.pokemonMovesPerSlide;
    let currentPokemonMoveIndex = this.pokemonMovesLoaded;

    const standbySlides = 3;
    while (slidesLoaded < slideInView + standbySlides && currentPokemonMoveIndex < this.pokemonMoves.length) {
      console.log(currentPokemonMoveIndex);
      this.loadPokemonMove(currentPokemonMoveIndex)
      currentPokemonMoveIndex++;
      slidesLoaded = this.pokemonMovesLoaded / this.pokemonMovesPerSlide;
    }
  }

  loadPokemonMove(index: number) {
    const url = this.pokemonMoves[index].move.url
    this.pokedexService.getPokemonMove(url).subscribe({
      next: moveDetails => {
        this.pokemonMoves[index].moveDetails = moveDetails;
      }
    })
    this.pokemonMovesLoaded++;
  }

  getFlavorTextEntry(move: PokemonMove) {
    const language = 'en'
    return move.flavor_text_entries.filter(m => { return m.language.name == language })[0].flavor_text;
  }

  getMoveName(move: PokemonMove) {
    const language = 'en'
    return move.names.filter(m => { return m.language.name == language })[0].name;
  }

  constructor(private pokedexService: PokedexService) { }

}

interface PokemonMoveReference {
  move: {
    name: string;
    url: string;
  }
}