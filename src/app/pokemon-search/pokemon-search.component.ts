import { Component, SimpleChanges, computed, signal } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
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
  filteredList: {name: string, url?: string}[] = [];

  public getFilteredList() {
    if(this.searchValue == '') {
      this.filteredList = [];
      return;
    }
    
    const pokemonPerSearch = 10
    let list = this.pokemonList;
    list = list.filter(p => p.includes(this.searchValue.toLowerCase())).splice(0,pokemonPerSearch)

    this.filteredList = list.map(p => { return {name: p}});

    this.filteredList.forEach(p => {
      this.getPicUrl(p.name).subscribe({
        next: url => {p.url = url}
      })
    })
  }

  getPicUrl(pokemon: string) {
    return this.pokedexService.getPokemon(pokemon).pipe(
      map(p => p.sprites.front_default)
    )
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
      this.filteredList = [];
    }
  }

  onClick(e: Event) {
    e.stopPropagation()
  }

}
