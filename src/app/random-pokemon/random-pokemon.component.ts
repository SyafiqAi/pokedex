import { Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-random-pokemon',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './random-pokemon.component.html',
  styleUrl: './random-pokemon.component.css'
})
export class RandomPokemonComponent {

  constructor(private pokedexService: PokedexService) { }
  private _randomPokemon = '';

  ngOnInit() {
    this.newRandomPokemon();
  }

  newRandomPokemon() {
    this.pokedexService.getRandomPokemonName().then(pokemon => {
      this._randomPokemon = pokemon;
    });
  }

  public get randomPokemon() {
    return this._randomPokemon;
  }
}
