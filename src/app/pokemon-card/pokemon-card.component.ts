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
import { PokemonCardDetails } from '../pokemon-card-details';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonMovesListComponent, PokemonTypeIconComponent, PokemonTypeIconListComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  constructor(private pokedexService: PokedexService) { }

  @Input({ required: true }) pokemonName!: string;
  loading = true;
  pokemonCardDetails: PokemonCardDetails | undefined;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonName'].currentValue) {
      this.makeCard();
    }
  }

  async makeCard() {
    this.loading = true;

    this.pokemonCardDetails = await this.pokedexService.pokemonCardDetails(this.pokemonName);

    this.loading = false;
  }

  public get types() {
    return this.pokemonCardDetails?.types
  }

  public get typeBg() {
    return this.pokemonCardDetails?.typeBgColor
  }

  public get picUrl() {
    return this.pokemonCardDetails?.officialArtworkUrl
  }

  public get name() {
    return this.pokemonCardDetails?.name
  }

  public get genus() {
    return this.pokemonCardDetails?.genus
  }

  public get description() {
    return this.pokemonCardDetails?.description
  }

  public get moves() {
    return this.pokemonCardDetails?.moves;
  }

}