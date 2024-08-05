/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemplateRegistryService } from './TemplateRegistry.service';

describe('Service: TemplateRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateRegistryService]
    });
  });

  it('should ...', inject([TemplateRegistryService], (service: TemplateRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
