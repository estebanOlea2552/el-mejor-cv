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
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  template4_theme01,
  template4_theme02,
  template4_theme03,
  template4_theme04,
  template4_theme05,
  template4_theme06,
} from 'src/app/components/templates/template4/template4-themes';
import { ExportService } from 'src/app/shared/services/export.service';
import { ProfilePictureService } from 'src/app/shared/services/profile-picture.service';
import { AppState } from 'src/app/shared/state/app.state';
import { themeSelector } from 'src/app/shared/state/selectors/selected-template.selectors';
import { notifyOverflow } from 'src/app/shared/state/actions/selected-template.action';
import { templateLangSelector } from 'src/app/shared/state/selectors/template-lang.selector';
import {
  SPANISH_TEMPLATE,
  ENGLISH_TEMPLATE,
} from 'src/app/model/template-lang';

@Component({
  selector: 'app-template4',
  templateUrl: './template4.component.html',
  styleUrls: ['./template4.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class Template4Component implements OnInit, OnDestroy {
  @ViewChild('cvContainer', { static: true }) cvContainer!: ElementRef;
  @ViewChild('leftContainer', { static: true }) leftContainer!: ElementRef;
  @ViewChild('rightContainer', { static: true }) rightContainer!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  resizeObserver!: ResizeObserver;
  overflowDetected: boolean = false;
  pictureUrl: string | null = null;
  pictureSubscription: Subscription = new Subscription();
  templateLangSubscription!: Subscription;
  templateLang!: any;
  templateThemeSubscription: Subscription = new Subscription();
  themes: Record<string, string> = {
    theme01: template4_theme01,
    theme02: template4_theme02,
    theme03: template4_theme03,
    theme04: template4_theme04,
    theme05: template4_theme05,
    theme06: template4_theme06,
  };
  style: HTMLStyleElement = document.createElement('style');

  constructor(
    private exportCv: ExportService,
    private pictureService: ProfilePictureService, // TODO: Replace ProfilePictureService with NGRX state management
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContainer);
    this.pictureSubscription = this.pictureService.picture$.subscribe(
      (picture) => {
        this.pictureUrl = picture;
      }
    );

    this.templateThemeSubscription = this.store
      .select(themeSelector)
      .subscribe((theme) => {
        console.log('Theme selected: ', theme);
        this.changeTheme(theme);
      });

    this.templateLangSubscription = this.store
      .select(templateLangSelector)
      .subscribe((lang: string) => {
        if (lang === 'spanish') {
          this.templateLang = SPANISH_TEMPLATE;
        } else if (lang === 'english') {
          this.templateLang = ENGLISH_TEMPLATE;
        } else {
          console.error(
            'TemplateLanguageSelector Error: Invalid Language Selection'
          );
        }
      });

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        this.alertOverflow(entry);
      }
    });
    this.resizeObserver.observe(
      this.leftContainer.nativeElement as HTMLElement
    );
    this.resizeObserver.observe(
      this.rightContainer.nativeElement as HTMLElement
    );
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object)
      return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some((key) => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  changeTheme(theme: string) {
    this.style.textContent = this.themes[theme] || this.themes['theme01'];
    if (!document.head.contains(this.style)) {
      document.head.appendChild(this.style);
    }
  }

  alertOverflow(entry: ResizeObserverEntry): void {
    if (entry.contentRect.height >= 562) {
      this.overflowDetected = true;
      this.store.dispatch(
        notifyOverflow({ hasOverflow: this.overflowDetected })
      );
    } else if (entry.contentRect.height < 562) {
      this.overflowDetected = false;
      this.store.dispatch(
        notifyOverflow({ hasOverflow: this.overflowDetected })
      );
    }
  }

  ngOnDestroy(): void {
    this.style.remove();
    if (this.pictureSubscription) {
      this.pictureSubscription.unsubscribe();
    }
    if (this.templateThemeSubscription) {
      this.templateThemeSubscription.unsubscribe();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
