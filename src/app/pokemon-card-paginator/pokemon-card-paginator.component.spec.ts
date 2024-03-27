import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardPaginatorComponent } from './pokemon-card-paginator.component';

describe('PokemonCardPaginatorComponent', () => {
  let component: PokemonCardPaginatorComponent;
  let fixture: ComponentFixture<PokemonCardPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonCardPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
