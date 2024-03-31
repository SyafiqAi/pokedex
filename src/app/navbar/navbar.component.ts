import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RandomPokemonComponent } from '../random-pokemon/random-pokemon.component';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RandomPokemonComponent, PokemonSearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'Pokédex';
  pokeballIcon = `../../assets/pokeball.svg`
}
