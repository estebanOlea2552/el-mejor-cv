import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private cvDataSubject = new Subject<any>();
  public cvDataInput$ = this.cvDataSubject.asObservable();

  public updateCvData(controlName: string, value: string): void {
    this.cvDataSubject.next({ controlName, value });
  }
}