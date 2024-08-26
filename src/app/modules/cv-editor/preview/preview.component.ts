import { AfterViewInit, Component, ViewContainerRef, OnDestroy, ViewChild, Type, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';

import { cvDataI } from 'src/app/interfaces/cv.interface';
import { MatButtonModule } from '@angular/material/button';
import { ExportService } from 'src/app/services/export.service';
import { TemplateRegistryService } from 'src/app/services/template-registry.service';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule]
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef; // Where the preview is displayed

  @ViewChild('previewContainer', { static: false })
  private previewContainer!: ElementRef; // Container for Panzoom element

  @ViewChild('preview', { static: false })
  private preview!: ElementRef; // The element controlled by the Panzoom functionality

  // Panzoom instance
  protected panzoom!: PanzoomObject;
  // Values for Panzoom's configuration
  private previewWidth: number = 0;
  private previewHeight: number = 0;

  // Suscriptions to handle the observable data of a resume
  private cvDataSubscription: Subscription | undefined;
  private selectedTemplateSubscription: Subscription | undefined;

  // Initialization of the cvPreview object
  protected cvPreview: cvDataI = {
    name: 'Esteban',
    lastname: 'Olea',
    jobPosition: 'Full-Stack Developer',
    aboutMe: 'Bla bla bla',
    academicBackground: [{
      grade: 'Programador Universitario',
      school: 'UNT-FACET',
      academicBackgroundInitDate: '',
      academicBackgroundEndDate: '',
      description: 'Programador que programa'
    }],
    workExperience: [{
      position: 'Frontend Developer Angular',
      company: 'Freelance',
      workExperienceInitDate: '',
      workExperienceEndDate: '',
      description: 'Trabajador que trabaja'
    }],
    skills: ['Angular', 'Java', 'MySQL']
  };

  constructor(
    private previewConnector: PreviewConnectorService,
    private exportCv: ExportService,
    private templateService: TemplateRegistryService
  ) { }

  // Subscriptions to the observables of the PreviewConnectorService
  ngAfterViewInit(): void {
    console.log('afterViewInit');
    this.cvDataSubscription = this.previewConnector.cvFieldValue$.
      subscribe((cvData) => {
        this.updateCv(cvData.field, cvData.value);
      });

    this.selectedTemplateSubscription =
      this.previewConnector.selectedTemplate$.subscribe((templateId: string) => {
        console.log(templateId);
        this.updateTemplate(templateId);
      })

    // Config Panzoom
    this.panzoom = Panzoom(this.preview.nativeElement, {
      animate: true, // Define si se animan las transiciones.
      duration: 300, // (número) Duración de la transición en milisegundos.
      startScale: 1, // (número) Valores iniciales de escala y desplazamiento (X e Y).
      minScale: 1.2,
      maxScale: 1.8,
      easing: 'ease-in',
    });

    this.setPanInitPosition();

    // Init Wheel Event listener
    this.previewContainer.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      const zoomFactor = event.deltaY < 0 ? 1.05 : 0.01;
      const currentScale = this.panzoom?.getScale();
      let newScale = currentScale * zoomFactor;

      if (newScale < this.panzoom?.getOptions().minScale!) {
        newScale = this.panzoom?.getOptions().minScale!;
      } else if (newScale > this.panzoom?.getOptions().maxScale!) {
        newScale = this.panzoom?.getOptions().maxScale!;
      }

      this.panzoom.zoom(newScale, { animate: true, focal: { x: 250, y: 250 } }
      );
    });
  }

  // Updates the preview in real time
  private updateCv(controlName: string, value: any): void {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  // Updates the selected template in real time
  private updateTemplate(templateId: string): void {
    console.log("preview: " + "templateId");
    const template = this.templateService.getTemplateById(templateId);
    if (template) {
      this.container.clear();
      const componentRef = this.container.createComponent(template.component as Type<any>);
      (componentRef.instance as any).cvPreview = this.cvPreview;
    }
  }

  // Panzoom methods

  private setPanInitPosition() {
    this.previewWidth = this.previewContainer.nativeElement.clientWidth;
    this.previewHeight = this.previewContainer.nativeElement.clientHeight;
    this.panzoom?.setOptions({
      // This values need more precision
      startX: (this.previewWidth / 5),
      startY: (this.previewHeight / 10)
    })
  }
  protected zoomIn(): void {
    this.panzoom?.zoomIn()
  }
  protected zoomOut(): void {
    this.panzoom?.zoomOut()
  }
  protected reset(): void {
    this.panzoom?.reset()
  }

  // Export Resume
  protected export(): void {
    this.exportCv.generatePdf();
  }

  ngOnDestroy(): void {
    if (this.cvDataSubscription) {
      this.cvDataSubscription.unsubscribe();
    }
    if (this.selectedTemplateSubscription) {
      this.selectedTemplateSubscription.unsubscribe();
    }
  }
}