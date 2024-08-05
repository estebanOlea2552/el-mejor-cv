import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { cvDataI } from 'src/app/interfaces/cv.interface';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template2Component {
  @Input() cvPreview: cvDataI = {
    name: '',
    lastname: '',
    jobPosition: '',
    aboutMe: '',
    academicBackground: [{
      grade: '',
      school: '',
      academicBackgroundInitDate: '',
      academicBackgroundEndDate: '',
      description: ''
    }],
    workExperience: [{
      position: '',
      company: '',
      workExperienceInitDate: '',
      workExperienceEndDate: '',
      description: ''
    }],
    skills: ['']
  };
}
