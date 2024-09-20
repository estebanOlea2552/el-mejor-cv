import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'text-line',
  template: `
    <div [formGroup]="groupName"> 
      <mat-form-field>
        <mat-label>{{ label }}</mat-label>
        <input
        matInput
        [formControlName]="controlName">
      </mat-form-field>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }  
  `],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TextLineComponent implements OnInit {
  @Input() groupName!: FormGroup; // Captures the FormGroup from the father
  @Input() controlName!: string; // Captures the control name for the 'formControlName' property
  @Input() label!: string; // Some text for the <label> or other component elements

  constructor() { }

  ngOnInit() {
  }

}
