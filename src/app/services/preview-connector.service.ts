import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private workerDataSubject = new Subject<any>();
  formCurrentValue$ = this.workerDataSubject.asObservable();

  constructor() { }

  updateWorkerField(field: string, value: any) {
    this.workerDataSubject.next({ field, value });
  }
}
