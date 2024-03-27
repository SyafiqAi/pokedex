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

  pokemonId: number = 0;
  
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.pokemonId = Number(routeParams.get('pokemonId'));
      this.route.paramMap
        .subscribe((params) => {
          this.pokemonId = Number(params.get('pokemonId'));
          // Get the related products here, or any other logic that depends on the params
        });
  }

  public get prevPokemon() {
    return String(this.pokemonId-1);
  }
  public get nextPokemon() {
    return String(this.pokemonId+1);
  }
  
}
