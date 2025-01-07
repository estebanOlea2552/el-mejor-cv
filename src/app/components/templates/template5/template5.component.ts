import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';
import { ProfilePictureService } from 'src/app/services/profile-picture.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { themeSelector } from 'src/app/state/selectors/selected-template.selectors';
import { 
  template5_theme01,
  template5_theme02,
  template5_theme03,
  template5_theme04,
  template5_theme05,
  template5_theme06
} from './template5-themes';


@Component({
  selector: 'app-template5',
  templateUrl: './template5.component.html',
  styleUrls: ['./template5.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Template5Component implements OnInit {
  @ViewChild('cvContent', { static: true }) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  pictureUrl: string | null = null;
  pictureSubscription: Subscription = new Subscription();
  templateThemeSubscription: Subscription = new Subscription();
  themes: Record<string, string> = {
    'theme01': template5_theme01,
    'theme02': template5_theme02,
    'theme03': template5_theme03,
    'theme04': template5_theme04,
    'theme05': template5_theme05,
    'theme06': template5_theme06,
  }
  backgroundImageMap: Record<string, string> = {
    'theme01': '../../../../assets/images/template5_background01.png',
    'theme02': '../../../../assets/images/template5_background02.png',
    'theme03': '../../../../assets/images/template5_background03.png',
    'theme04': '../../../../assets/images/template5_background04.png',
    'theme05': '../../../../assets/images/template5_background05.png',
    'theme06': '../../../../assets/images/template5_background06.png',
  }
  currentBackgroundImage!: string; 
  style: HTMLStyleElement = document.createElement('style');

  constructor(
    private exportCv: ExportService,
    private store: Store<AppState>,
    private pictureService: ProfilePictureService // TODO: Replace ProfilePictureService with NGRX state management
  ) { }

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
    this.pictureSubscription = this.pictureService.picture$.subscribe(picture => {
      this.pictureUrl = picture;
    });

    this.templateThemeSubscription = this.store.select(themeSelector).subscribe(theme => {
      this.changeTheme(theme);
    })
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  changeTheme(theme: string): void {
    this.style.textContent = this.themes[theme] || this.themes['theme01'];
    this.currentBackgroundImage = this.backgroundImageMap[theme] || this.backgroundImageMap['theme01'];
    if(!document.head.contains(this.style)) {
      document.head.appendChild(this.style);
    }
  }

  ngOnDestroy(): void {
    this.style.remove();
    this.pictureSubscription.unsubscribe();
    this.templateThemeSubscription.unsubscribe();
  }
}