import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'export-button',
  template: `
    <button
    class="generate-button"
    [ngClass]="{'generate-button-mobile': isMobile}"
    mat-icon-button (click)="export()">
      <mat-icon class="download">download</mat-icon>
    </button>
  `,
  styles: [`
  .generate-button {
    background-color: var(--bittersweet);
  }
  .generate-button-mobile {
    transform: scale(.7);
  }
  .download {
      color: var(--white);
  }
  `],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class ExportButtonComponent implements OnInit, OnDestroy {
  isMobile!: boolean;
  isMobileSubscription!: Subscription;

  constructor(private exportService: ExportService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isMobileSubscription = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(
        result => this.isMobile = result.matches
      );
  }

  protected export(): void {
    this.exportService.generatePdf();
  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

}
