import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'init-end-date',
  template: `
    <div [formGroup]="groupName">
      <mat-form-field>
        <mat-label>Mes</mat-label>
        <mat-select>
          <div *ngFor="let month of months">
            <mat-option [value]="month">{{ month }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Año</mat-label>
        <mat-select>
          <div *ngFor="let year of years">
            <mat-option [value]="year">{{ year }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Mes</mat-label>
        <mat-select [disabled]="inCourse">
          <div *ngFor="let month of months">
            <mat-option [value]="month">{{ month }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Año</mat-label>
        <mat-select [disabled]="inCourse">
          <div *ngFor="let year of years">
            <mat-option [value]="year">{{ year }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <mat-checkbox 
      [checked]="inCourse" 
      (change)="this.inCourse = !this.inCourse;">
        Presente
      </mat-checkbox>
    </div>
  `,
  styles: [`* {color: black}`],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class InitEndDateComponent implements OnInit {
  @Input() public groupName!: FormGroup;
  protected months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  protected years: number[] = [];
  protected inCourse: boolean = false;
  
  constructor() { }
  
  ngOnInit() {
    this.loadYears();
    console.log(this.inCourse);
  }
  
  private loadYears(): void {
    const date: Date = new Date;
    const actualYear: number = date.getFullYear();
    const limitYear: number = 1950;
    for (let i = actualYear; i >= limitYear; i--) {
      this.years.push(i);
    }
  }
}
