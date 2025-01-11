import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { notifyOverflow } from 'src/app/state/actions/selected-template.action';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Template2Component implements OnInit, OnDestroy {
  @ViewChild('cvContainer', { static: true }) cvContainer!: ElementRef;
  @ViewChild('leftContainer', { static: true }) leftContainer!: ElementRef;
  @ViewChild('rightContainer', { static: true }) rightContainer!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  resizeObserver!: ResizeObserver;
  overflowDetected: boolean = false;

  constructor(private exportCv: ExportService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContainer);
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.alertOverflow(entry);
      }
    })
    this.resizeObserver.observe(this.leftContainer.nativeElement as HTMLElement);
    this.resizeObserver.observe(this.rightContainer.nativeElement as HTMLElement);
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  alertOverflow(entry: ResizeObserverEntry): void {
    if (entry.contentRect.height >= 562) {
      this.overflowDetected = true;
      this.store.dispatch(notifyOverflow({ hasOverflow: this.overflowDetected }));

    } else if (entry.contentRect.height < 562) {
      this.overflowDetected = false;
      this.store.dispatch(notifyOverflow({ hasOverflow: this.overflowDetected }));
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
