import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
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
    academicBackground: {
      title: '',
      school: '',
      date: '',
      description: ''
    },
    workExperience: {
      position: '',
      company: '',
      date: '',
      description: ''
    },
    skills: ''
  };
  
  currentValueSuscription: Subscription | undefined;

  constructor(private previewConnector: PreviewConnectorService) {}

  ngAfterViewInit(): void {
    this.currentValueSuscription = this.previewConnector.formCurrentValue$.subscribe((workerData) => {
      this.updateWorker(workerData.field, workerData.value);
    })
  }

  updateWorker(controlName: string, value: any) {
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