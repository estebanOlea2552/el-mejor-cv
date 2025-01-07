import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';
import { ProfilePictureService } from 'src/app/services/profile-picture.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { themeSelector } from 'src/app/state/selectors/selected-template.selectors';
import {
  template4_theme01, template4_theme02, template4_theme03, template4_theme04, template4_theme05, template4_theme06
} from 'src/app/components/templates/template4/template4-themes';

@Component({
  selector: 'app-template4',
  templateUrl: './template4.component.html',
  styleUrls: ['./template4.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Template4Component implements OnInit, OnDestroy {
  @ViewChild('cvContent', { static: true }) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  pictureUrl: string | null = null;
  pictureSubscription: Subscription = new Subscription();
  templateThemeSubscription: Subscription = new Subscription();
  themes: Record<string, string> = {
    'theme01': template4_theme01,
    'theme02': template4_theme02,
    'theme03': template4_theme03,
    'theme04': template4_theme04,
    'theme05': template4_theme05,
    'theme06': template4_theme06,
  }
  style: HTMLStyleElement = document.createElement('style');

  constructor(
    private exportCv: ExportService,
    private pictureService: ProfilePictureService, // TODO: Replace ProfilePictureService with NGRX state management
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
    this.pictureSubscription = this.pictureService.picture$.subscribe(picture => {
      this.pictureUrl = picture;
    });

    this.templateThemeSubscription = this.store.select(themeSelector).subscribe(theme => {
      console.log('Theme selected: ', theme);
      this.changeTheme(theme);
    })
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  changeTheme(theme: string) {
    this.style.textContent = this.themes[theme] || this.themes['theme01'];
    if (!document.head.contains(this.style)) {
      document.head.appendChild(this.style);
    }
  }

  ngOnDestroy(): void {
    this.style.remove();
    this.pictureSubscription.unsubscribe();
    this.templateThemeSubscription.unsubscribe();
  }
}