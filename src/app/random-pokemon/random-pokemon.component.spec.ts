import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPokemonComponent } from './random-pokemon.component';

describe('RandomPokemonComponent', () => {
  let component: RandomPokemonComponent;
  let fixture: ComponentFixture<RandomPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
