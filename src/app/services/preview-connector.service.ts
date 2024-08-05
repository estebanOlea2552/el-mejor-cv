import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewConnectorService {
  private cvDataSubject = new Subject<any>();
  public cvFieldValue$ = this.cvDataSubject.asObservable();

  private templateSubject = new Subject<any>();
  public selectedTemplate$ = this.templateSubject.asObservable();

  constructor() { }

  public updateCvData(field: string, value: string): void {
    this.cvDataSubject.next({ field, value });
  }

  public updateSelectedTemplate(templateId: string): void {
    this.templateSubject.next(templateId);
  }
}

