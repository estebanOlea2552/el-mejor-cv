/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilePictureService } from './profile-picture.service';

describe('Service: ProfilePicture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilePictureService]
    });
  });

  it('should ...', inject([ProfilePictureService], (service: ProfilePictureService) => {
    expect(service).toBeTruthy();
  }));
});
