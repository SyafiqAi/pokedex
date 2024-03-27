import { Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonCardPaginatorComponent } from '../pokemon-card-paginator/pokemon-card-paginator.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-card-view',
  standalone: true,
  imports: [PokemonCardComponent, PokemonCardPaginatorComponent],
  templateUrl: './pokemon-card-view.component.html',
  styleUrl: './pokemon-card-view.component.css'
})
export class PokemonCardViewComponent {
  constructor(private route: ActivatedRoute) { }

  pokemonId = 0

  ngOnInit() {
    console.log('hello')
    // const routeParams = this.route.snapshot.paramMap;
    // this.pokemonId = Number(routeParams.get('pokemonId'));
    this.route.paramMap
      .subscribe((params) => {
        this.pokemonId = Number(params.get('pokemonId'));
        console.log('param : ', this.pokemonId)
      });
  }


  toString(n: number) {
    return String(n)
  }
}
