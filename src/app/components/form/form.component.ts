import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { WorkerI } from 'src/app/interfaces/cv.interface';
import { distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class FormComponent implements OnInit {
  cvForm: FormGroup;
  private workerForm: WorkerI = {
    name: '',
    lastname: '',
    jobPosition: '',
    aboutMe: '',
    academicBackground: {
      title: '',
      school: '',
      AcademicBackgroundInitDate: '',
      AcademicBackgroundEndDate: '',
      description: ''
    },
    workExperience: {
      position: '',
      company: '',
      WorkExperienceInitDate: '',
      WorkExperienceEndDate: '',
      description: ''
    },
    skills: ''
  };

  constructor(private formBuilder: FormBuilder, private previewConnector: PreviewConnectorService) {
    this.cvForm = this.formBuilder.group(
      {
        name: [''],
        lastname: [''],
        jobPosition: [''],
        aboutMe: [''],
        academicBackground: this.formBuilder.group({
          title: [''],
          school: [''],
          AcademicBackgroundInitDate: [''],
          AcademicBackgroundEndDate: [''],
          description: ['']
        }),
        workExperience: this.formBuilder.group({
          position: [''],
          company: [''],
          WorkExperienceInitDate: [''],
          WorkExperienceEndDate: [''],
          description: ['']
        }),
        skills: ['']
      }
    )
  }

  ngOnInit(): void {
    this.initFormListeners();
  }

  initFormListeners() {
    Object.keys(this.cvForm.controls).forEach(controlName => {
      const control = this.cvForm.get(controlName);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(subControlName => {
          const subControl = control.get(subControlName);
          this.subscribeToControlChanges(subControl, `${controlName}.${subControlName}`);
        });
      } else {
        this.subscribeToControlChanges(control, controlName);
      }
    });
  }

  subscribeToControlChanges(control: any, controlName: string) {
    control.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.updateWorker(controlName, value);
    });
  }

  updateWorker(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.workerForm as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.workerForm as any)[keys[0]][keys[1]] = value;
    }
    this.previewConnector.updateWorkerData(controlName, value);
  }

  send(){
    this.cvForm.reset();
  }
}