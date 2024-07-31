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
import { WorkerI } from 'src/app/interfaces/cv.interface';
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
  private workerForm: WorkerI = {
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

  constructor(private formBuilder: FormBuilder, private previewConnector: PreviewConnectorService) {
    this.cvForm = this.formBuilder.group(
      {
        name: [''],
        lastname: [''],
        jobPosition: [''],
        aboutMe: [''],
        academicBackground: this.formBuilder.array([
          this.createAcademicBackground()
        ]),
        workExperience: this.formBuilder.array([
          this.createWorkExperience()
        ]),
        skills: this.formBuilder.array([''])
      }
    );
  };

  ngOnInit(): void {
    this.initFormListeners();
  }

  /* Métodos para crear, añadir y eliminar el formGroup 'academicBackground' */

  get academicBackground(): FormArray {
    return this.cvForm.get('academicBackground') as FormArray;
  }

  createAcademicBackground(): FormGroup {
    return this.formBuilder.group({
      grade: [''],
      school: [''],
      academicBackgroundInitDate: [''],
      academicBackgroundEndDate: [''],
      description: ['']
    });
  }

  addAcademicBackground(): void {
    this.academicBackground.push(this.createAcademicBackground());
  }

  removeAcademicBackground(index: number): void {
    this.academicBackground.removeAt(index);
  }

  /* Métodos para crear, añadir y eliminar el formGroup 'workExperience' */

  get workExperience(): FormArray {
    return this.cvForm.get('workExperience') as FormArray;
  }

  createWorkExperience(): FormGroup {
    return this.formBuilder.group({
      position: [''],
      company: [''],
      workExperienceInitDate: [''],
      workExperienceEndDate: [''],
      description: ['']
    });
  }

  addWorkExperience(): void {
    this.workExperience.push(this.createWorkExperience());
  }

  removeWorkExperience(index: number): void {
    this.workExperience.removeAt(index);
  }

  /* Manejo del campo 'skills' */

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.formBuilder.control(['']));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  /* Suscripción a los valores de los controles */
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

  /* Carga de los nuevos valores a workerForm */
  updateWorker(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.workerForm as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.workerForm as any)[keys[0]][keys[1]] = value;
    }
    this.previewConnector.updateWorkerData(controlName, value);
  }

  /* Reinicio del formulario */

  send(){
    this.cvForm.reset();
  }
}