import { AfterViewInit, Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form.component';
import { PreviewComponent } from 'src/app/components/preview/preview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
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
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink
  ]
})
export class CvEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicView', { read: ViewContainerRef, static: true})
  protected dynamicView!: ViewContainerRef;
  protected prevIsVisible: boolean = false;

  isMobile!: boolean;

  constructor(private breakPointObserver: BreakpointObserver){}

  ngOnInit(): void {
    // Determines the device the app is running on
    this.breakPointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(value => this.isMobile = value.matches);
  }

  ngAfterViewInit(): void {
    if(this.isMobile) {
      this.alternateViews();
    }
  }

  alternateViews():void {
    this.prevIsVisible = !this.prevIsVisible;
    if (this.prevIsVisible) {
      this.loadComponent(PreviewComponent);
    }
    else {
      this.loadComponent(FormComponent);
    }
  }

  loadComponent(component: Type<any>) {
    this.dynamicView.clear();
    this.dynamicView.createComponent(component);
  }
}