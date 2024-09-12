import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private cvDataSubject = new Subject<any>();
  public cvFieldValue$ = this.cvDataSubject.asObservable();

  constructor() { }

  public updateCvData(field: string, value: string): void {
    this.cvDataSubject.next({ field, value });
  }
}

