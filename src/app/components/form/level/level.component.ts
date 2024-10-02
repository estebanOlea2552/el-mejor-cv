import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'level',
  template: `
  <mat-form-field [formGroup]="groupName">
    <mat-label>{{ label }}</mat-label>
    <mat-select
      [(value)]="levelSelected"
      [formControlName]="controlName">
      <div *ngFor="let level of levels">
        <mat-option [value]="level">
          {{ level }}
        </mat-option>
      </div>
    </mat-select>
  </mat-form-field>
  `,
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class LevelComponent implements OnInit {
  @Input() groupName!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  protected levels: string[] = [
    'Básico',
    'Intermedio',
    'Avanzado',
    'Experto'
  ]
  protected levelSelected: string = '';

  constructor() { }

  ngOnInit() {
  }

}
