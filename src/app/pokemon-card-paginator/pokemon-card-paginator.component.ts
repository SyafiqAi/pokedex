import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-card-paginator',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './pokemon-card-paginator.component.html',
  styleUrl: './pokemon-card-paginator.component.css'
})
export class PokemonCardPaginatorComponent {

  constructor(private route: ActivatedRoute) {}

  pokemonId: string = '0';
  
  ngOnInit() {
      this.route.paramMap
        .subscribe((params) => {
            this.pokemonId = String(params.get('pokemonId'));
        });
  }

  public get prevPokemon() {
    return String(Number(this.pokemonId)-1);
  }
  public get nextPokemon() {
    return String(Number(this.pokemonId)+1);
  }

  moreThanOne(pokemonId: string) {
    return Number(pokemonId) > 1;
  }
  
}
