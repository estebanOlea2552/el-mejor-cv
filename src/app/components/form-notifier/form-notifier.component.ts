import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { overflowNotifySelector } from 'src/app/state/selectors/selected-template.selectors';

@Component({
  selector: 'form-notifier',
  templateUrl: './form-notifier.component.html',
  styleUrls: ['./form-notifier.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSnackBarModule, MatButtonModule],
})
export class FormNotifierComponent implements OnInit, OnDestroy {
  overflowDetected: boolean = false;
  overflowNotifySuscription: Subscription = new Subscription();
  isMobile!: boolean;

  constructor(private store: Store<AppState>, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.overflowNotifySuscription = this.store.select(overflowNotifySelector).subscribe(hasOverflow => {
      this.overflowDetected = hasOverflow;
    })

    this.setupBreakpointObserver();
  }

  closeNotification(): void {
    this.overflowDetected = false;
  }

  setupBreakpointObserver(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(
        value => {
          this.isMobile = value.matches;
        }
      );
  }

  ngOnDestroy(): void {
    this.overflowNotifySuscription.unsubscribe();
  }
}