import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { Store } from '@ngrx/store';
import { ExportService } from 'src/app/shared/services/export.service';
import { AppState } from 'src/app/shared/state/app.state';
import { notifyOverflow } from 'src/app/shared/state/actions/selected-template.action';
import { Subscription } from 'rxjs';
import { templateLangSelector } from 'src/app/shared/state/selectors/template-lang.selector';
import { SPANISH_TEMPLATE, ENGLISH_TEMPLATE } from 'src/app/model/template-lang';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class Template1Component implements OnInit, OnDestroy {
  @ViewChild('cvContainer', { static: true }) cvContainer!: ElementRef;
  @ViewChild('cvContent', { static: true }) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  templateLangSubscription!: Subscription;
  templateLang!: any;
  resizeObserver!: ResizeObserver;
  overflowDetected: boolean = false;

  constructor(
    private exportCv: ExportService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContainer);
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        this.alertOverflow(entry);
      }
    });
    this.resizeObserver.observe(this.cvContent.nativeElement as HTMLElement);

    this.templateLangSubscription = this.store
      .select(templateLangSelector)
      .subscribe((lang: string) => {
        if (lang === 'spanish') {
          this.templateLang = SPANISH_TEMPLATE;
        } else if (lang === 'english') {
          this.templateLang = ENGLISH_TEMPLATE;
        } else {
          console.error('TemplateLanguageSelector Error: Invalid Language Selection');
        }
      });
  }

  /* Receives a field from cvPreview (object) and the key of that field (keys) to be evaluated */
  hasValues(object: any, keys: string[]): boolean {
    if (!object)
      return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some((key) => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition,
    the anonymous function returns false if object[key] does not contain any value */
  }

  alertOverflow(entry: ResizeObserverEntry): void {
    if (entry.contentRect.height >= 510) {
      this.overflowDetected = true;
      this.store.dispatch(
        notifyOverflow({ hasOverflow: this.overflowDetected })
      );
    } else if (entry.contentRect.height < 510) {
      this.overflowDetected = false;
      this.store.dispatch(
        notifyOverflow({ hasOverflow: this.overflowDetected })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
