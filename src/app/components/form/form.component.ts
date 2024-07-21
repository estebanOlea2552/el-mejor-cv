import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ]
})
export class FormComponent {
  cvForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.cvForm = this.formBuilder.group(
      {
        name: [''],
        lastname: [''],
        jobPosition: [''],
        aboutMe: [''],
        academicBackground: this.formBuilder.group({
          title: [''],
          school: [''],
          date: [''],
          description: ['']
        }),
        workExperience: this.formBuilder.group({
          position: [''],
          company: [''],
          date: [''],
          description: ['']
        }),
        skills: ['']
      }
    )
  }
}
