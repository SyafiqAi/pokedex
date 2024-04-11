import { Component, SimpleChanges, computed, signal } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  constructor(private pokedexService: PokedexService, private router: Router) { }

  async ngOnInit() {
    this.pokemonList = await this.pokedexService.getAllPokemonNames();
    this.getFilteredList();
    window.addEventListener('keydown', this.changeActiveIndex)
  }

  pokemonList: string[] = [];
  searchValue = '';
  showModal = false;
  filteredList: { name: string, url?: string }[] = [];
  activeIndex = 0;
  scrollTop: number = 0;

  public getFilteredList() {
    if (this.searchValue == '') {
      this.filteredList = [];
      return;
    }

    this.activeIndex = 0;

    const pokemonPerSearch = 10
    let list = this.pokemonList;
    list = list.filter(p => p.includes(this.searchValue.toLowerCase())).splice(0, pokemonPerSearch)

    this.filteredList = list.map(p => { return { name: p } });

    this.filteredList.forEach(p => {
      this.getPicUrl(p.name).subscribe({
        next: url => { p.url = url }
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
    const disableScroll = show;
    this.toggleScroll(disableScroll);

    // For some reason focusing immediately doesn't work.
    // Have to set a tiny delay.
    setTimeout(() => {
      const el = document.getElementById('searchInput');
      el?.focus();
    }, 1);

    if (!show) {
      this.searchValue = '';
      this.filteredList = [];
      window.removeEventListener('keydown', this.changeActiveIndex)
    } else {
      window.addEventListener('keydown', this.changeActiveIndex)
    }
  }

  changeActiveIndex = (event: KeyboardEvent) => {

    const listSize = this.filteredList.length;
    if (listSize == 0) {
      return;
    }
    const finalIndex = listSize - 1

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (this.activeIndex == 0) {
          this.activeIndex = finalIndex;
        } else {
          this.activeIndex--;
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (this.activeIndex == finalIndex) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }
        break;

      case 'Enter':
        const selectedPokemonName = this.filteredList[this.activeIndex].name;
        this.router.navigate(['/pokemon', selectedPokemonName]);
        this.toggleModal(false);
        break;

      default:
        break;
    }
  }

  toggleScroll(disableScroll: boolean) {
    const html = document.documentElement;
    const body = document.body;
    if (disableScroll) {
      this.scrollTop = html.scrollTop;
      body.className = `disable-scrollbar`
      body.style.top = `-${this.scrollTop}px`
    } else {
      body.className = ''
      html.scrollTop = this.scrollTop;
    }

  }

  onClick(e: Event) {
    e.stopPropagation()
  }
}
