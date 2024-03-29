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

  pokemonId = '0'

  ngOnInit() {
    // const routeParams = this.route.snapshot.paramMap;
    // this.pokemonId = Number(routeParams.get('pokemonId'));
    this.route.paramMap
      .subscribe((params) => {
        try {
          this.pokemonId = String(params.get('pokemonId'));
        } catch (error) {
          console.log(error)
          alert('Something went wrong.')          
        }
      });
  }
}
