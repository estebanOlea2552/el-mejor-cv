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
      <ng-container *ngIf="!isLangLevel">
        <div *ngFor="let level of basicLevels">
          <mat-option [value]="level">
            {{ level }}
          </mat-option>
        </div>
      </ng-container>
      <ng-container *ngIf="isLangLevel">
        <div *ngFor="let level of langLevels">
          <mat-option [value]="level">
            {{ level }}
          </mat-option>
        </div>
      </ng-container>
    </mat-select>
    <button
        class="clear-button"
        *ngIf="groupName.get(controlName)?.value"
        matSuffix
        mat-icon-button
        aria-label="Limpiar"
        (click)="clearInput()">
        <mat-icon>close</mat-icon>
      </button>
  </mat-form-field>
  `,
  styles: [`
      .clear-button {
        transform: scale(.8);
        color: var(--light-red);
      }
    `],
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
  @Input() isLangLevel!: boolean;
  protected basicLevels: string[] = [
    'Básico',
    'Intermedio',
    'Avanzado',
    'Experto'
  ]
  protected langLevels: string[] = [
    'A1 - Principiante',
    'A2 - Básico',
    'B1 - Intermedio',
    'B2 - Avanzado',
    'C1 - Muy avanzado',
    'C2 - Experto'
  ]

  protected levelSelected: string = '';

  constructor() { }

  ngOnInit() {

  }

  protected clearInput(){
    this.groupName.get(this.controlName)?.setValue('');
  }
}
