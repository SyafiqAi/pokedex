import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { PokedexService } from './pokedex.service';
import { NavbarComponent } from './navbar/navbar.component';
import './firebase'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, PokemonCardComponent, PokemonListComponent, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private pokedexService: PokedexService) { }

  title = 'Pokédex';

  async ngOnInit() {
    register();
  }
}