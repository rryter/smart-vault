import { TestBed } from '@angular/core/testing';
import { Web3Service } from '@lukso/web3-rx';
import { web3ServiceMock } from '@lukso/web3-rx/mocks';

import { KeyManagerService } from './key-manager.service';

describe('KeyManagerService', () => {
  let service: KeyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Web3Service, useValue: web3ServiceMock }],
    });
    service = TestBed.inject(KeyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
