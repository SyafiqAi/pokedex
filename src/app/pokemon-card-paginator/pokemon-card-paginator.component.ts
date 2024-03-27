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
      this.route.paramMap
        .subscribe((params) => {
          this.pokemonId = Number(params.get('pokemonId'));
        });
  }

  public get prevPokemon() {
    return String(this.pokemonId-1);
  }
  public get nextPokemon() {
    return String(this.pokemonId+1);
  }
  
}
