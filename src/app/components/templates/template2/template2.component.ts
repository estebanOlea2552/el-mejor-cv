import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template2Component implements OnInit {
  @ViewChild('cvContent', {static: true}) cvContent!: ElementRef;
  @Input() cvPreview: cvData = {
    name: '',
    lastname: '',
    jobPosition: '',
    aboutMe: '',
    academicBackground: [{
      grade: '',
      school: '',
      aBInitDate: '',
      aBEndDate: '',
      description: ''
    }],
    workExperience: [{
      position: '',
      company: '',
      wExpInitDate: '',
      wExpEndDate: '',
      description: ''
    }],
    skills: ['']
  };

  constructor(private exportCv: ExportService){}

  ngOnInit(): void {
    this.exportCv.setCvToExport(this.cvContent);
  }

}
