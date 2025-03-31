import {
  Component,
  ViewContainerRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state/app.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { templateSelector } from 'src/app/shared/state/selectors/selected-template.selectors';
import { TemplateRegistryService } from 'src/app/shared/services/template-registry.service';
import { PreviewConnectorService } from 'src/app/shared/services/preview-connector.service';
import { ExportService } from 'src/app/shared/services/export.service';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { TemplateLangSelectorComponent } from '../template-lang-selector/template-lang-selector.component';
import { ExportButtonComponent } from '../export-button/export-button.component';

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
    MatButtonModule,
    ThemeSelectorComponent,
    TemplateLangSelectorComponent,
    ExportButtonComponent,
  ],
})
export class PreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  // HTML element used to render the cv-templates inside it
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  // HTML element where to aplly Panzoom funcions
  // Panzoom requires a parent-child structure to aplly controls
  @ViewChild('previewContainer', { static: false })
  previewContainer!: ElementRef;

  // Child HTML element controlled by PanZoom functions
  @ViewChild('preview', { static: false })
  preview!: ElementRef;

  cvDataSubscription: Subscription | undefined; //gets form data from previewConnectorService
  templateSelectorSubscription: Subscription | undefined; //gets the currente template theme from the Store
  tempalteLangSubscription: Subscription | undefined; //gets the currente template language from the Store

  // Form data sent to each template for previewing.
  // This variable receives its values from the previewConnectorService
  cvDataPreview: cvData = cvDataInit;

  // Receives its value from the Store
  // Determines the language of the selected template
  templateLang!: string;

  // Panzoom instance
  panzoom!: PanzoomObject;

  // Controls responsive functionalities
  isMobile!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private templateService: TemplateRegistryService,
    private previewConnector: PreviewConnectorService,
    private store: Store<AppState>,
    private exportCv: ExportService
  ) {}

  ngOnInit(): void {
    this.cvDataSubscription = this.previewConnector.cvDataInput$.subscribe(
      (cvData) => {
        this.updatePreview(cvData.controlName, cvData.value);
      }
    );

    // Detect mobile devices
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => (this.isMobile = result.matches));

    // Defines a default selected template
    this.updateSelectedTemplate('t00'); // Default template

    // Get selected Template from the Store
    this.templateSelectorSubscription = this.store
      .select(templateSelector)
      .subscribe((templateId: string) => {
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

    if (this.isMobile) {
      this.panzoom.setOptions({
        startScale: 0.8,
      });
    }

    // Defines a center position to the panzoom element
    this.setPanInitPosition();
  }

  // Updates the cvDataPreview in real time
  updatePreview(controlName: string, value: any): void {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvDataPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvDataPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  // Updates the selected template in real time
  updateSelectedTemplate(templateId: string): void {
    if (templateId === 't00') {
      const defaultScreen = this.templateService.getDefaultScreen();
      if (defaultScreen) {
        this.container.clear();
        this.container.createComponent(defaultScreen.component as Type<any>);
      }
    } else {
      const template = this.templateService.getTemplateById(templateId);
      if (template) {
        this.container.clear();
        const componentRef = this.container.createComponent(
          template.component as Type<any>
        );
        // Sends the cv data to the child component, which receives it through an @Input
        (componentRef.instance as any).cvPreview = this.cvDataPreview;
      }
    }
  }

  // Panzoom methods
  setPanInitPosition() {
    const previewWidth = this.previewContainer.nativeElement.clientWidth;
    const previewHeight = this.previewContainer.nativeElement.clientHeight;

    if (this.isMobile) {
      this.panzoom.setOptions({
        startX: previewWidth / 60,
        startY: previewHeight / 6,
      });
    } else {
      this.panzoom.setOptions({
        startX: previewWidth / 5,
        startY: previewHeight / 7,
      });
    }
  }

  zoomIn(): void {
    this.panzoom?.zoomIn();
  }
  zoomOut(): void {
    this.panzoom?.zoomOut();
  }
  reset(): void {
    this.panzoom?.reset();
  }

  // Export Resume
  export(): void {
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