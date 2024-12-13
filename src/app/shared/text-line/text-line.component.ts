import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'text-line',
  template: `
    <mat-form-field [formGroup]="groupName" class="form-field">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [formControlName]="controlName"
        class="input">
        <mat-error class="error" *ngIf="this.groupName.get(this.controlName)?.invalid">
          Cuidado! D:
        </mat-error>
    </mat-form-field>
  `,
  styles: [`
      .form-field {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .input {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      .error {
        transform: scale(1.2);
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
export class TextLineComponent {
  @Input() public groupName!: FormGroup; 
  @Input() public controlName!: string; 
  @Input() public label!: string;

  constructor() { }
}
