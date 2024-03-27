import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardViewComponent } from './pokemon-card-view.component';

describe('PokemonCardViewComponent', () => {
  let component: PokemonCardViewComponent;
  let fixture: ComponentFixture<PokemonCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
