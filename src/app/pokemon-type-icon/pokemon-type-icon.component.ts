import { Component, Input, SimpleChanges } from '@angular/core';
import styles from '../utilities/pokemon-type-styles.json';
import { PokemonTypes } from '../pokemon-types';
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

  showType: boolean = false;
  private _styles = ''

  public get styles() {
    if(this.reverseColor)
      return `${(styles.text as any)[this.type]} bg-white`
    else 
      return `${(styles.bg as any)[this.type]} text-white`
  }

  getSvg() {
    return `../../assets/pokemon-type-icons/${this.type}.svg`
  }

}
