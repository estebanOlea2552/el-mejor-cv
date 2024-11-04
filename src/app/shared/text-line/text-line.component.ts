import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'text-line',
  template: `
    <mat-form-field [formGroup]="groupName">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [formControlName]="controlName">
    </mat-form-field>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }  
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TextLineComponent implements OnInit {
  @Input() public groupName!: FormGroup; 
  @Input() public controlName!: string; 
  @Input() public label!: string;

  constructor() { }

  ngOnInit() {
  }
  
}
