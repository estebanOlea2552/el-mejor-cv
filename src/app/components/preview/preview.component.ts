import { 
  Component,
  ViewContainerRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Type
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom';
import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init'; 
import { ExportService } from 'src/app/services/export.service';
import { TemplateRegistryService } from 'src/app/services/template-registry.service';
import { templateSelector } from 'src/app/state/selectors/template.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  // HTML Element where the preview is displayed
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;

  // HTML Element containing PanZoom element
  @ViewChild('previewContainer', { static: false })
  private previewContainer!: ElementRef;

  // HTML Element controlled by PanZoom functions
  @ViewChild('preview', { static: false })
  private preview!: ElementRef; 

  // Subscriptions for managing the observable data of cvData
  private cvDataSubscription: Subscription | undefined;
  private templateSelectorSubscription: Subscription | undefined;

  // Initialization of the cvPreview object
  protected cvDataPreview: cvData = cvDataInit;

  // PanZoom instance
  protected panzoom!: PanzoomObject;

  // Variable for panzoom's config
  isMobile!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private templateService: TemplateRegistryService,
    private previewConnector: PreviewConnectorService,
    private store: Store,
    private exportCv: ExportService,
  ) { }
  

  ngOnInit(): void {
    // Subscription to the cvData of the previewConnector
    this.cvDataSubscription = this.previewConnector.cvDataInput$.
      subscribe((cvData) => {
        this.updatePreview(cvData.controlName, cvData.value);
      });

    // Detect mobile devices
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(
      result => this.isMobile = result.matches
    );

    this.updateSelectedTemplate('template5');
    
    // Template selector from the Store
    this.templateSelectorSubscription = this.store.select(templateSelector).subscribe((templateId: string) => {
      this.updateSelectedTemplate(templateId);
    });
  }

  ngAfterViewInit(): void {
    // Config Panzoom
    this.panzoom = Panzoom(this.preview.nativeElement, {
      animate: true,
      duration: 300,
      minScale: 0.8,
      maxScale: 1.8,
      easing: 'ease-in',
    });

    if(this.isMobile) {
      this.panzoom.setOptions({
        startScale: 0.8
      })
    }

    // Defines a center position to the panzoom element
    this.setPanInitPosition();

    // Init Wheel Event listener
    /* this.previewContainer.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      const zoomFactor = event.deltaY < 0 ? 1.05 : 0.01;
      const currentScale = this.panzoom?.getScale();
      let newScale = currentScale * zoomFactor;

      if (newScale < this.panzoom?.getOptions().minScale!) {
        newScale = this.panzoom?.getOptions().minScale!;
      } else if (newScale > this.panzoom?.getOptions().maxScale!) {
        newScale = this.panzoom?.getOptions().maxScale!;
      }
      this.panzoom.zoom(
        newScale, { animate: true, focal: { x: 250, y: 250 } }
      );
    }); */
  } 

  // Updates the cvDataPreview in real time
  private updatePreview(controlName: string, value: any): void {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvDataPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvDataPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  // Updates the selected template in real time
  private updateSelectedTemplate(templateId: string): void {
    const template = this.templateService.getTemplateById(templateId);
    if (template) {
      this.container.clear();
      const componentRef = this.container.createComponent(template.component as Type<any>);
      (componentRef.instance as any).cvPreview = this.cvDataPreview;
    }
  }

  // Panzoom methods
  private setPanInitPosition() {
    const previewWidth = this.previewContainer.nativeElement.clientWidth;
    const previewHeight = this.previewContainer.nativeElement.clientHeight;

    if(this.isMobile) {
      this.panzoom.setOptions({
        startX: previewWidth / 60,
        startY: previewHeight /6
      })
    } else {
      this.panzoom.setOptions({
        startX: previewWidth / 5,
        startY: previewHeight / 7
      })
    }
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
    if (this.templateSelectorSubscription) {
      this.templateSelectorSubscription.unsubscribe();
    }
  }
}