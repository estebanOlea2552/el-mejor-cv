import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'num-input',
  template: `
  <mat-form-field [formGroup]="groupName">
    <mat-label>{{ label }}</mat-label>
    <input
    matInput
    type="number"
    [formControlName]="controlName"
    />
  </mat-form-field>`,
  styles: [''],
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NumInputComponent implements OnInit {
  @Input() groupName!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;

  constructor() { }

  ngOnInit() {
  }

}
