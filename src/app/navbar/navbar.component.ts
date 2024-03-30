import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokedexService } from '../pokedex.service';
import { RandomPokemonComponent } from '../random-pokemon/random-pokemon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RandomPokemonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'Pokédex';
  private _randomPokemon = ''
  constructor(private pokedexService: PokedexService) {}



}
