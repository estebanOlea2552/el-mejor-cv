import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';
import { ProfilePictureService } from 'src/app/services/profile-picture.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template4',
  templateUrl: './template4.component.html',
  styleUrls: ['./template4.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template4Component implements OnInit, OnDestroy {
  @ViewChild('cvContent', {static: true}) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;
  pictureUrl: string | null = null;
  pictureSubscription: Subscription = new Subscription();

  constructor(
    private exportCv: ExportService,
    private pictureService: ProfilePictureService // This service sould be replaced by NGRX
  ) {}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
    this.pictureSubscription = this.pictureService.picture$.subscribe(picture => {
      this.pictureUrl = picture;
    });
  }

  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* If the field does not exist within cvPreview, returns false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() checks if at least one element meets the condition, the anonymous function returns false if object[key] does not contain any value */
  }

  ngOnDestroy(): void {
    this.pictureSubscription.unsubscribe();
  }
}