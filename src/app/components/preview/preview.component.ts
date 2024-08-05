import { AfterViewInit, Component, ViewContainerRef, ElementRef, OnDestroy, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';

import {cvDataI } from 'src/app/interfaces/cv.interface';
import { MatButtonModule } from '@angular/material/button';
import { ExportService } from 'src/app/services/export.service';
import { TemplateRegistryService } from 'src/app/services/template-registry.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatButtonModule]
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  protected cvPreview: cvDataI = {
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
  
  private cvDataSubscription: Subscription | undefined;
  private selectedTemplateSubscription: Subscription | undefined;
  private htmlPreview: any;

  constructor(
    private previewConnector: PreviewConnectorService,
    private exportCv: ExportService,
    private templateService: TemplateRegistryService
  ) {}

  ngAfterViewInit(): void {
    this.cvDataSubscription = this.previewConnector.cvFieldValue$.
    subscribe((cvData) => {
      this.updateCv(cvData.field, cvData.value);
    });

    this.selectedTemplateSubscription = this.previewConnector.selectedTemplate$.
    subscribe((templateId: string) => {
      this.updateTemplate(templateId);
    })
  }

  private updateCv(controlName: string, value: any):void {
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
      const componentRef = this.container.createComponent(template.component as Type<any>);
      (componentRef.instance as any).cvPreview = this.cvPreview;
      const nativeElement = componentRef.location.nativeElement;
      this.htmlPreview = nativeElement.innerHTML;
    }
  }

  protected export():void {
    console.log(this.htmlPreview)
    this.exportCv.generatePdf('preview');
  }

  ngOnDestroy(): void {
    if(this.cvDataSubscription){
      this.cvDataSubscription.unsubscribe();
    }
    if (this.selectedTemplateSubscription) {
      this.selectedTemplateSubscription.unsubscribe();
    }
  }
}