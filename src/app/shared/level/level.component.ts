import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
    <button
        *ngIf="groupName.get(controlName)?.value"
        matSuffix
        mat-icon-button
        aria-label="Limpiar"
        (click)="clearInput()">
        <mat-icon>close</mat-icon>
      </button>
  </mat-form-field>
  `,
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
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

  protected clearInput(){
    this.groupName.get(this.controlName)?.setValue('');
  }
}
