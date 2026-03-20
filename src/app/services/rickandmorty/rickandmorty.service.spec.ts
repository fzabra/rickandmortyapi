import { TestBed } from '@angular/core/testing';
import { RickandmortyService } from './rickandmorty.service';
import { provideHttpClient } from '@angular/common/http';

describe('RickandmortyService', () => {
  let service: RickandmortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(RickandmortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
