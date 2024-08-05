import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private workerDataSubject = new Subject<any>();
  public fieldCurrentValue$ = this.workerDataSubject.asObservable();

  private templateSubject = new Subject<any>();
  public selectedTemplate$ = this.templateSubject.asObservable();

  constructor() { }

  public updateWorkerData(field: string, value: string): void {
    this.workerDataSubject.next({ field, value });
  }

  public updateSelectedTemplate(templateId: string): void {
    this.templateSubject.next(templateId);
  }
}

