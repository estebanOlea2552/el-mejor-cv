import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  pictureSubject = new BehaviorSubject<string | null>(null);
  picture$ = this.pictureSubject.asObservable();

  constructor() { }

  updatePicture(picture: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      // Emmits the picture as a base64 string
      this.pictureSubject.next(reader.result as string);
    };
    reader.readAsDataURL(picture);
  }

  clearPicture(): void {
    this.pictureSubject.next(null);
  }
}
