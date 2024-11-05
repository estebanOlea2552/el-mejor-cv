import { Component, HostListener, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SubscriptionLike } from 'rxjs';
import { FormComponent } from 'src/app/components/form/form.component';
import { PreviewComponent } from 'src/app/components/preview/preview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

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
export class CvEditorComponent implements OnInit, OnDestroy {
  protected notification: string = "Cuidado! Si sales del editor, tus datos se perderán";
  // Location returns an object of type "SubscriptionLike"
  private locationSubscription!: SubscriptionLike;

  @ViewChild('dynamicView', { read: ViewContainerRef, static: true})
  protected dynamicView!: ViewContainerRef;

  constructor(
    private location: Location,){}

  /* @HostListener('window:beforeunload', ['$event'])
  beforeunloadNotification($event: any):void {
    $event.returnValue = this.notification;
  } */

  ngOnInit(): void {
    /* this.locationSubscription = this.location.subscribe(() => {
      alert(this.notification);
    }) */
  }

  showEditor():void {
    this.loadComponent(FormComponent);
  }

  showPreview():void {
    this.loadComponent(PreviewComponent);
  }

  loadComponent(component: Type<any>) {
    this.dynamicView.clear();
    this.dynamicView.createComponent(component);
  }

  ngOnDestroy(): void {
    /* this.locationSubscription.unsubscribe(); */
  }
}