import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private workerDataSubject = new Subject<any>();
  fieldCurrentValue$ = this.workerDataSubject.asObservable();

  constructor() { }

  updateWorkerData(field: string, value: string) {
    this.workerDataSubject.next({ field, value });
  }
}
