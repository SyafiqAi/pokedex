import { Component, Input } from '@angular/core';
import { PokemonTypeIconComponent } from '../pokemon-type-icon/pokemon-type-icon.component';

@Component({
  selector: 'app-pokemon-type-icon-list',
  standalone: true,
  imports: [PokemonTypeIconComponent],
  templateUrl: './pokemon-type-icon-list.component.html',
  styleUrl: './pokemon-type-icon-list.component.css'
})
export class PokemonTypeIconListComponent {
  @Input({required: true}) types!: string[];
  spreadIcons = false;
}
