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
import { TextLineComponent } from "./text-line/text-line.component";
import { InitEndDateComponent } from "./init-end-date/init-end-date.component";

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
    MatNativeDateModule,
    TextLineComponent,
    InitEndDateComponent
]
})
export class FormComponent implements OnInit {
  // FormGroup Declaration
  cvFormGroup: FormGroup;

  // cvData Declaration and init
  private cvDataInput: cvData = {
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

  constructor(
    private formBuilder: FormBuilder,
    private previewConnector: PreviewConnectorService
  ) {
    // FormGroup build
    this.cvFormGroup = this.formBuilder.group(
      {
        name: [],
        lastname: [],
        jobPosition: [],
        aboutMe: [],
        academicBackground: this.formBuilder.array([
          this.createAcademicBg()
        ]),
        workExperience: this.formBuilder.array([
          this.createWorkExp()
        ]),
        skills: this.formBuilder.array([])
      }
    );
  };

  ngOnInit(): void {
    this.initFormListeners();
  }

  // Methods to create, add and remove the formGroup of type 'academicBackground'
  get academicBackground(): FormArray {
    return this.cvFormGroup.get('academicBackground') as FormArray;
  }
  private createAcademicBg(): FormGroup {
    return this.formBuilder.group({
      grade: [],
      school: [],
      aBInitDate: [],
      aBEndDate: [],
      description: []
    });
  }
  protected addAcademicBg(): void {
    this.academicBackground.push(this.createAcademicBg());
  }
  protected removeAcademicBg(index: number): void {
    this.academicBackground.removeAt(index);
  }

  // Methods to create, add and remove the formGroup of type 'workExperience'
  get workExperience(): FormArray {
    return this.cvFormGroup.get('workExperience') as FormArray;
  }
  private createWorkExp(): FormGroup {
    return this.formBuilder.group({
      position: [],
      company: [],
      wExpInitDate: [],
      wExpEndDate: [],
      description: []
    });
  }
  protected addWorkExp(): void {
    this.workExperience.push(this.createWorkExp());
  }
  protected removeWorkExp(index: number): void {
    this.workExperience.removeAt(index);
  }

  // Methods to add and remove skills

  get skills(): FormArray {
    return this.cvFormGroup.get('skills') as FormArray;
  }
  protected addSkill(): void {
    this.skills.push(this.formBuilder.control(['']));
  }
  protected removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Create subscriptions for each FormControl
  private initFormListeners() {
    Object.keys(this.cvFormGroup.controls).forEach(
      (controlName: string) => {
        const control = this.cvFormGroup.get(controlName);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(
            (subControlName: string) => {
              const subControl = control.get(subControlName);
              this.subscribeToTheControl(subControl, `${controlName}.${subControlName}`);
            }
          );
        } else {
          this.subscribeToTheControl(control, controlName);
        }
      }
    );
  }

  // Take a FormControl and create a subscription
  private subscribeToTheControl(control: any, controlName: string) {
    control.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.updateCvData(controlName, value);
    });
  }

  // Loads the input value to the cvDataInput object and sends it to the previewConnector
  private updateCvData(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvDataInput as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvDataInput as any)[keys[0]][keys[1]] = value;
    }
    this.previewConnector.updateCvData(controlName, value);
  }

  resetForm(){
    this.cvFormGroup.reset()
  }
}