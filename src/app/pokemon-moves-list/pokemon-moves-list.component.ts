import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { oshawott } from '../data/oshawott';

@Component({
  selector: 'app-pokemon-moves-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-moves-list.component.html',
  styleUrl: './pokemon-moves-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonMovesListComponent {

  color = 'pink'
  swiperStyles = {
    '--swiper-pagination-color': this.color,
    '--swiper-pagination-bullet-inactive-color': 'white',
    '--swiper-pagination-bullet-inactive-opacity': '0.2',
    '--swiper-navigation-color': this.color,
  }

  oshawottMoves = oshawott.moves;
  
  noOfSlides = 5;
  slides: number[] = []

  ngOnInit() {
    for (let i = 0; i < this.noOfSlides; i++) {
      this.slides.push(i)
    }
  }

  slideClicked(index: number) {
    this.slides[index]++;
  }
  
  slideChange(event: Event) {
    const activeIndex = (event as CustomEvent).detail[0].activeIndex
    const secondLastIndex = this.slides.length - 2;

    console.log('active: ', activeIndex)
  }

  // constructor(private pokedexService: PokedexService) { }

}
