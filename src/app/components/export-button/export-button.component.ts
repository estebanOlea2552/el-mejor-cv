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
    <div class="export-container">
      <div class="export-message" [class.show]="showMessage">
        <span>Descargar</span>
      </div>
      <button
        class="generate-button"
        [ngClass]="{'generate-button-mobile': isMobile}"
        mat-icon-button
        (click)="export()"
        (mouseenter)="showMessage = true"
        (mouseleave)="showMessage = false">
        <mat-icon class="download">download</mat-icon>
      </button>
    </div>

  `,
  styles: [`
    .export-container {
      position: relative;
      display: inline-block; /* Mantiene el tamaño exacto del botón */
    }
    .generate-button {
      background-color: var(--phthalo-blue);
    }
    .generate-button-mobile {
      transform: scale(.7);
    }
    .download {
      color: var(--tea-green);
    }
    .export-message {
      position: absolute;
      bottom: 100%; /* Lo coloca justo encima del botón */
      left: 0%; /* Centra horizontalmente respecto al botón */
      transform: translateX(-50%) translateY(-5px); /* Lo mueve 5px hacia arriba */
      background-color: var(--phthalo-blue);
      color: var(--tea-green);
      width: max-content;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      color: var(--white);
      font-weight: 500;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }
    .export-message.show {
      opacity: 1;
      visibility: visible;
    }
  `],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class ExportButtonComponent implements OnInit, OnDestroy {
  isMobile!: boolean;
  isMobileSubscription!: Subscription;
  showMessage: boolean = false;

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
