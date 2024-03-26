import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pokemon-type-icon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-type-icon.component.html',
  styleUrl: './pokemon-type-icon.component.css'
})
export class PokemonTypeIconComponent {
  @Input({ required: true }) types!: string[];

  showType: boolean[] = []
  
  ngOnInit() {
    this.showType = Array(this.types.length);
    this.showType.fill(false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['types']) {
      let variableChange = changes['types'];
      if (variableChange.firstChange) {
        return;
      }
      console.log(variableChange)
      this.types = variableChange.currentValue.reverse();
    }
  }

  getSvg(type: string) {
    return `../../assets/pokemon-type-icons/${type}.svg`
  }

}
