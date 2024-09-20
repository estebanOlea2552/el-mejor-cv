import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-cv-editor',
  templateUrl: './cv-editor.component.html',
  styleUrls: ['./cv-editor.component.css']
})
export class CvEditorComponent implements OnInit, OnDestroy {
  protected notification: string = "Cuidado! Si sales del editor, tus datos se perderán";
  // Location returns an object of type "SubscriptionLike"
  private locationSubscription!: SubscriptionLike;

  constructor(private location: Location){}

  /* @HostListener('window:beforeunload', ['$event'])
  beforeunloadNotification($event: any):void {
    $event.returnValue = this.notification;
  } */

  ngOnInit(): void {
    /* this.locationSubscription = this.location.subscribe(() => {
      alert(this.notification);
    }) */
  }

  ngOnDestroy(): void {
    /* this.locationSubscription.unsubscribe(); */
  }
}