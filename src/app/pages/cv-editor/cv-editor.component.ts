import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form.component';
import { PreviewComponent } from 'src/app/components/preview/preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-cv-editor',
  templateUrl: './cv-editor.component.html',
  styleUrls: ['./cv-editor.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    PreviewComponent,
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
  private formComponentRef: ComponentRef<FormComponent> | null = null;
  private previewComponentRef: ComponentRef<PreviewComponent> | null = null;

  // Stores the selected card from the sidenav
  protected selectedCard: string = "";

  constructor(
    private breakPointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) { };

  ngOnInit(): void {
    this.setupBreakPointObserver();
  }

  ngAfterViewInit(): void {
    console.log('selectedCard first value: ' + this.selectedCard);
    console.log('Prev is visible: ' + this.prevIsVisible);
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
          }
        }
      );
  }

  alternateViews(): void {
    console.log('The alternate function was activated')
    this.prevIsVisible = !this.prevIsVisible;
    if (this.prevIsVisible) {
      console.log('Prev is true');
      this.loadComponent(PreviewComponent);
    }
    else {
      console.log('Prev is false')
      this.loadComponent(FormComponent);
    }
  }

  loadComponent(component: Type<any>): void {
    this.dynamicView.clear();
    if (component === FormComponent) {
      this.formComponentRef = this.dynamicView.createComponent(component);
      console.log('Form component was created');
    }
    else if (component === PreviewComponent) {
      this.previewComponentRef = this.dynamicView.createComponent(component);
      console.log('Preview component was created');
    }
  }

  changeSelectedCard(cardName: string): void {
    this.selectedCard = cardName;
    console.log('The selected card was changed, new value: ' + this.selectedCard)
    if (this.formComponentRef && this.isMobile) {
      this.formComponentRef.setInput('selectedCard', cardName);
    }
  }
}