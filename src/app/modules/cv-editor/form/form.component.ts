import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { cvData } from 'src/app/model/cv-data.model';
import { distinctUntilChanged } from 'rxjs';

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
  private workerProfile: cvData = {
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

  constructor (
    private formBuilder: FormBuilder,
    private previewConnector: PreviewConnectorService
  ) {
      this.cvForm = this.formBuilder.group(
        {
          name: [''],
          lastname: [''],
          jobPosition: [''],
          aboutMe: [''],
          academicBackground: this.formBuilder.array([
            this.createAcademicBg()
          ]),
          workExperience: this.formBuilder.array([
            this.createWorkExp()
          ]),
          skills: this.formBuilder.array([''])
        }
      );
    };

  ngOnInit(): void {
    this.initFormListeners();
  }
  
  /* Methods to create, add and remove the formGroup of type 'academicBackground' */
  get academicBackground(): FormArray {
    return this.cvForm.get('academicBackground') as FormArray;
  }

  private createAcademicBg(): FormGroup {
    return this.formBuilder.group({
      grade: [''],
      school: [''],
      academicBackgroundInitDate: [''],
      academicBackgroundEndDate: [''],
      description: ['']
    });
  }

  protected addAcademicBg(): void {
    this.academicBackground.push(this.createAcademicBg());
  }

  protected removeAcademicBg(index: number): void {
    this.academicBackground.removeAt(index);
  }

  /* Methods to create, add and remove the formGroup of type 'workExperience' */

  get workExperience(): FormArray {
    return this.cvForm.get('workExperience') as FormArray;
  }

  private createWorkExp(): FormGroup {
    return this.formBuilder.group({
      position: [''],
      company: [''],
      workExperienceInitDate: [''],
      workExperienceEndDate: [''],
      description: ['']
    });
  }

  protected addWorkExp(): void {
    this.workExperience.push(this.createWorkExp());
  }

  protected removeWorkExp(index: number): void {
    this.workExperience.removeAt(index);
  }

  /* 'skills' field handler */

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  protected addSkill(): void {
    this.skills.push(this.formBuilder.control(['']));
  }

  protected removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  /* Subscription to Control values*/
  private initFormListeners() {
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

  private subscribeToControlChanges(control: any, controlName: string) {
    control.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.updateWorkerProfile(controlName, value);
    });
  }

  /* workerForm loader for new values */
  private updateWorkerProfile(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.workerProfile as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.workerProfile as any)[keys[0]][keys[1]] = value;
    }
    this.previewConnector.updateCvData(controlName, value);
  }
}