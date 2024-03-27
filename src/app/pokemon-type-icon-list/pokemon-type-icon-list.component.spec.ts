import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeIconListComponent } from './pokemon-type-icon-list.component';

describe('PokemonTypeIconListComponent', () => {
  let component: PokemonTypeIconListComponent;
  let fixture: ComponentFixture<PokemonTypeIconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTypeIconListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonTypeIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
