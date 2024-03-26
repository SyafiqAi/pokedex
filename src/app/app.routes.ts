import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonMovesListComponent } from './pokemon-moves-list/pokemon-moves-list.component';

export const routes: Routes = [
    {path: '', component: PokemonListComponent},
    {path: 'pokemon/:pokemonName', component: PokemonCardComponent},
    {path: 'moves-list', component: PokemonMovesListComponent}
];
