import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovesListComponent } from './pokemon-moves-list.component';

describe('PokemonMovesListComponent', () => {
  let component: PokemonMovesListComponent;
  let fixture: ComponentFixture<PokemonMovesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMovesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonMovesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
