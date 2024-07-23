import { TestBed } from '@angular/core/testing';

import { PreviewConnectorService } from './preview-connector.service';

describe('PreviewConnectorService', () => {
  let service: PreviewConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
