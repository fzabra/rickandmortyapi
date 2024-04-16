import { TestBed } from '@angular/core/testing';

import { DetailCharacterService } from './detail-character.service';

describe('DetailCharacterService', () => {
  let service: DetailCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
