import { PokedexService } from '../pokedex.service';
import { Component } from '@angular/core';
import { PokemonThumbnailComponent } from '../pokemon-thumbnail/pokemon-thumbnail.component';
import { CommonModule } from '@angular/common';
import { PokemonNameAndUrl } from '../pokemon-name-and-url';
import { SentinelComponent } from '../sentinel/sentinel.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonThumbnailComponent, CommonModule, SentinelComponent, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  providers: [PokedexService]
})
export class PokemonListComponent {

  readonly firstPage = 1;
  currentPage: number = 1;
  sentinelMsg = 'loading...'
  pokemonList: PokemonNameAndUrl[] | undefined;
  next = ''
  constructor(private pokedexService: PokedexService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParamMap.subscribe(queryParams => {
      const pageParam = Number(queryParams.get('page'));

      this.updatePage(pageParam);
    })
  }
  
  updatePage = async(pageParam: number) => {
    this.currentPage = (!pageParam || pageParam < 1) ? this.firstPage : pageParam;

    this.pokemonList = await this.pokedexService.getPokemonListByPage(this.currentPage);
  }

}
