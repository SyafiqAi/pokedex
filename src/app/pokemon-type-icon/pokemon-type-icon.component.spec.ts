import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeIconComponent } from './pokemon-type-icon.component';

describe('PokemonTypeIconComponent', () => {
  let component: PokemonTypeIconComponent;
  let fixture: ComponentFixture<PokemonTypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTypeIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
