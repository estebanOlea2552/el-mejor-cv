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

@Component({
  selector: 'app-template5',
  templateUrl: './template5.component.html',
  styleUrls: ['./template5.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template5Component implements OnInit {
  @ViewChild('cvContent', {static: true}) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  pictureUrl: string | null = null;
  pictureSubscription: Subscription = new Subscription();
  templateThemeSubscription: Subscription = new Subscription();
  

  constructor(
    private exportCv: ExportService,
    private store: Store<AppState>,
    private pictureService: ProfilePictureService // This service sould be replaced by NGRX
  ) {}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
    this.pictureSubscription = this.pictureService.picture$.subscribe(picture => {
      this.pictureUrl = picture;
    });

    this.templateThemeSubscription = this.store.select(themeSelector).subscribe(theme => {
      console.log('Theme selected: ', theme);
    })
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  ngOnDestroy(): void {
    this.pictureSubscription.unsubscribe();
    this.templateThemeSubscription.unsubscribe();
  }
}