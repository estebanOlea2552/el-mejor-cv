import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';

import { WorkerI } from 'src/app/interfaces/cv.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule]
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  workerPreview: WorkerI = {
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
  
  currentValueSuscription: Subscription | undefined;

  constructor(private previewConnector: PreviewConnectorService) {}

  ngAfterViewInit(): void {
    this.currentValueSuscription = this.previewConnector.fieldCurrentValue$.subscribe((workerData) => {
      this.updateWorkerPreview(workerData.field, workerData.value);
    })
  }

  updateWorkerPreview(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.workerPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.workerPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  ngOnDestroy(): void {
    if(this.currentValueSuscription){
      this.currentValueSuscription.unsubscribe();
    }
  }  
}