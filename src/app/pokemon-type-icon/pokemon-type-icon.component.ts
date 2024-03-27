import { Component, Input, SimpleChanges } from '@angular/core';
import { PokemonTypes } from '../pokemon-types';
import { PokemonTypeStylesService } from '../pokemon-type-styles.service';
@Component({
  selector: 'app-pokemon-type-icon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-type-icon.component.html',
  styleUrl: './pokemon-type-icon.component.css'
})
export class PokemonTypeIconComponent {
  @Input({ required: true }) type!: string;
  @Input() reverseColor = false;

  constructor(private pokemonTypeStylesService: PokemonTypeStylesService) {
    this.styles = this.pokemonTypeStylesService.styles
  }

  showType: boolean = false;
  styles;
  tooltipStyles: string = '';
  
  ngOnInit() {
    if(this.reverseColor)
      this.tooltipStyles =  `${(this.styles.text as any)[this.type]} bg-white`
    else 
      this.tooltipStyles =  `${(this.styles.bg as any)[this.type]} text-white`
  }
  
  getSvg() {
    return `../../assets/pokemon-type-icons/${this.type}.svg`
  }

}
