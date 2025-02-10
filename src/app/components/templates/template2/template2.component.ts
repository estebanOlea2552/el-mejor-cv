import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  template2_theme01, template2_theme02, template2_theme03, template2_theme04, template2_theme05, template2_theme06
} from './template2-themes';
import { ExportService } from 'src/app/shared/services/export.service';
import { themeSelector } from 'src/app/shared/state/selectors/selected-template.selectors';
import { notifyOverflow } from 'src/app/shared/state/actions/selected-template.action';
import { AppState } from 'src/app/shared/state/app.state';

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
  templateThemeSubscription!: Subscription;
  themes: Record<string, string> = {
    'theme01': template2_theme01,
    'theme02': template2_theme02,
    'theme03': template2_theme03,
    'theme04': template2_theme04,
    'theme05': template2_theme05,
    'theme06': template2_theme06,
  }
  style: HTMLStyleElement = document.createElement('style');

  constructor(private exportCv: ExportService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContainer);
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.alertOverflow(entry);
      }
    })

    this.templateThemeSubscription = this.store.select(themeSelector).subscribe(theme => {
      console.log('Theme selected: ', theme);
      this.changeTheme(theme);
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

  changeTheme(theme: string) {
    this.style.textContent = this.themes[theme] || this.themes['theme01'];
    if (!document.head.contains(this.style)) {
      document.head.appendChild(this.style);
    }
  }

  ngOnDestroy(): void {
    this.style.remove();
    if (this.templateThemeSubscription) {
      this.templateThemeSubscription.unsubscribe();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
