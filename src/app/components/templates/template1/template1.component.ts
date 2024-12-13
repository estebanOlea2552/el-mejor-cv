import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template1Component implements OnInit {
  @ViewChild('cvContent', {static: true}) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;

  constructor(private exportCv: ExportService) {}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
    for (let index = 0; index < this.cvPreview.workExperience.length; index++) {
      const element = this.cvPreview.workExperience[index];
      console.log(element);
    }
  }
}