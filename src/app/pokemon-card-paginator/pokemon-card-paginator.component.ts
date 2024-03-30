import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PokedexService } from '../pokedex.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card-paginator',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './pokemon-card-paginator.component.html',
  styleUrl: './pokemon-card-paginator.component.css'
})
export class PokemonCardPaginatorComponent {

  constructor(private route: ActivatedRoute, private pokedexService: PokedexService) { }

  pokemonName: string = '';
  private _prevPokemon = ''
  private _nextPokemon = ''

  async ngOnInit() {
    this.route.paramMap
      .subscribe((params) => {
        this.pokemonName = String(params.get('pokemonName'));
        this.getNextAndPrevPokemon();
      });
  }

  async getNextAndPrevPokemon() {
    const prev = this.pokedexService.getPrevPokemonName(this.pokemonName)
    const next = this.pokedexService.getNextPokemonName(this.pokemonName)
    Promise.all([prev,next]).then(([prev,next]) => {
      this._prevPokemon = prev
      this._nextPokemon = next
    })
  }

  public get prevPokemon() {
    return this._prevPokemon
  }
  public get nextPokemon() {
    return this._nextPokemon
  }

  
}
