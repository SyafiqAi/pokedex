import { Component, computed, signal } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {
  constructor(private pokedexService: PokedexService) { }

  async ngOnInit() {
    this.pokemonList = await this.pokedexService.getAllPokemonNames();
  }

  pokemonList: string[] = []
  searchValue = ''
  showModal = false;


  handleInput() {
    console.log(this.searchValue);
  }

  public get filteredList() {
    const pokemonPerSearch = 10
    const filteredList = this.pokemonList;
    return filteredList.filter(p => p.includes(this.searchValue.toLowerCase())).splice(0,pokemonPerSearch);
  }

  toggleModal(show: boolean) {
    this.showModal = show;

    // For some reason focusing immediately doesn't work.
    // Have to set a tiny delay.
    setTimeout(() => {
      const el = document.getElementById('searchInput');
      el?.focus();
    }, 1);

    if(!show) {
      this.searchValue = '';
    }
  }

  onClick(e: Event) {
    e.stopPropagation()
  }

}
