import { Component, Input, SimpleChanges, effect } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';
import { PokemonSpecies } from '../pokemon-species';
import { oshawott, oshawottSpecies } from '../data/oshawott'
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonMovesListComponent } from '../pokemon-moves-list/pokemon-moves-list.component';
import { TextFormatterService } from '../text-formatter.service';
import { PokemonTypeIconComponent } from '../pokemon-type-icon/pokemon-type-icon.component';
import { PokemonTypeStylesService } from '../pokemon-type-styles.service';
import { PokemonTypeIconListComponent } from '../pokemon-type-icon-list/pokemon-type-icon-list.component';
import { PokemonTypes } from '../pokemon-types';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonMovesListComponent, PokemonTypeIconComponent, PokemonTypeIconListComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  constructor(private pokedexService: PokedexService) { }

  @Input({ required: true }) pokemonId!: number;

  // pokemon: Pokemon | null = null;
  loading = true;

  pTypes: string[] | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonId'].currentValue) {
      this.makeCard();
    }
  }

  async makeCard() {
    this.loading = true;

    await this.pokedexService.setPokemonId(this.pokemonId);

    this.loading = false;
  }

  public get types() {
    return this.pokedexService.pokemonTypes;
  }

  public get typeBg() {
    return this.pokedexService.pokemonTypeBgColor;
  }

  public get picUrl() {
    return this.pokedexService.officialArtworkUrl;
  }

  public get pokemonName() {
    return this.pokedexService.pokemonName;
  }

  public get genus() {
    return this.pokedexService.pokemonGenus;
  }

  public get description() {
    return this.pokedexService.pokemonDescription;
  }

  public get pokemon() {
    return this.pokedexService.pokemon;
  }

}