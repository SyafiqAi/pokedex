import { TestBed } from '@angular/core/testing';

import { PokemonTypeStylesService } from './pokemon-type-styles.service';

describe('PokemonTypeStylesService', () => {
  let service: PokemonTypeStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTypeStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
