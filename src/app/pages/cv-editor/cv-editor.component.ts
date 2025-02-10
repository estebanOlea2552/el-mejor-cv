import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { FormNotifierComponent } from 'src/app/components/form-notifier/form-notifier.component';
import { RouterLink } from '@angular/router';
import { ExportService } from 'src/app/shared/services/export.service';
import { FormComponent } from 'src/app/components/form/form.component';
import { PreviewComponent } from 'src/app/components/preview/preview.component';

@Component({
  selector: 'app-cv-editor',
  templateUrl: './cv-editor.component.html',
  styleUrls: ['./cv-editor.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    PreviewComponent,
    FormNotifierComponent,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class CvEditorComponent implements OnInit, AfterViewInit {
  // Handle variable for display dinamically the <form> and <preview> elements or the dynamicView container
  protected isMobile: boolean = true;

  // Handler variable for the alternate form/preview function
  protected prevIsVisible: boolean = false;

  // Here the form and preview are rendered dinamically when the variable 'isMobile' is true
  @ViewChild('dynamicView', { read: ViewContainerRef, static: true })
  protected dynamicView!: ViewContainerRef;

  // FormComponent and PreviewComponent instances
  protected formComponentRef: ComponentRef<FormComponent> | null = null;
  protected previewComponentRef: ComponentRef<PreviewComponent> | null = null;

  // Stores the selected card from the sidenav
  protected selectedCard: string = "pinfo";

  constructor(
    private breakPointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private exportCv: ExportService
  ) { };

  ngOnInit(): void {
    this.setupBreakPointObserver();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  // Determines the device the app is running on
  private setupBreakPointObserver(): void {
    this.breakPointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(
        value => {
          this.isMobile = value.matches
          if (this.isMobile) {
            this.loadComponent(FormComponent);
          } else {
            this.dynamicView.clear();
          }
        }
      );
  }

  alternateViews(): void {
    this.prevIsVisible = !this.prevIsVisible;
    if (this.prevIsVisible) {
      this.loadComponent(PreviewComponent);
    }
    else {
      this.loadComponent(FormComponent);
    }
  }

  loadComponent(component: Type<any>): void {
    this.dynamicView.clear();
    if (component === FormComponent) {
      this.formComponentRef = this.dynamicView.createComponent(component);
    }
    else if (component === PreviewComponent) {
      this.previewComponentRef = this.dynamicView.createComponent(component);
    }
  }

  changeSelectedCard(cardName: string): void {
    this.selectedCard = cardName;
    if (this.formComponentRef && this.isMobile) {
      this.formComponentRef.setInput('selectedCard', cardName);
    }
  }

  export():void {
    this.exportCv.generatePdf();
  }
}