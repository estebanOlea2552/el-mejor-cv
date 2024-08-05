import { AfterViewInit, Component, ViewContainerRef, ElementRef, OnDestroy, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';

import { WorkerI } from 'src/app/interfaces/cv.interface';
import { MatButtonModule } from '@angular/material/button';
import { ExportService } from 'src/app/services/export.service';
import { TemplateRegistryService } from 'src/app/services/TemplateRegistry.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatButtonModule]
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cv') cv!: ElementRef<HTMLDivElement>
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  cvPreview: WorkerI = {
    name: '',
    lastname: '',
    jobPosition: '',
    aboutMe: '',
    academicBackground: [{
      grade: '',
      school: '',
      academicBackgroundInitDate: '',
      academicBackgroundEndDate: '',
      description: ''
    }],
    workExperience: [{
      position: '',
      company: '',
      workExperienceInitDate: '',
      workExperienceEndDate: '',
      description: ''
    }],
    skills: ['']
  };
  
  private cvValueSubscription: Subscription | undefined;
  private selectedTemplateSubscription: Subscription | undefined;

  constructor(
    private previewConnector: PreviewConnectorService,
    private exportCv: ExportService,
    private templateService: TemplateRegistryService
  ) {}

  ngAfterViewInit(): void {
    this.cvValueSubscription = this.previewConnector.fieldCurrentValue$.
    subscribe((workerData) => {
      this.updateCv(workerData.field, workerData.value);
    });

    this.selectedTemplateSubscription = this.previewConnector.selectedTemplate$.
    subscribe((templateId: string) => {
      this.updateTemplate(templateId);
    })
  }

  updateCv(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  private updateTemplate(templateId: string):void {
    const template = this.templateService.getTemplateById(templateId);
    if (template) {
      this.container.clear();
      const componentRef = this.container.createComponent(template.component as Type<any>)
    }
  }

  export(){
    this.exportCv.generatePdf('preview');
  }

  ngOnDestroy(): void {
    if(this.cvValueSubscription){
      this.cvValueSubscription.unsubscribe();
    }
    if (this.selectedTemplateSubscription) {
      this.selectedTemplateSubscription.unsubscribe();
    }
  }
}