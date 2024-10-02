import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'init-end-date',
  template: `
    <div [formGroup]="groupName">
      <mat-form-field>
        <mat-label>Mes</mat-label>
        <mat-select
          [(value)]="initMonthSelected"
          [formControlName]="initMControl">
          <div *ngFor="let month of months">
            <mat-option [value]="month">{{ month }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Año</mat-label>
        <mat-select 
          [(value)]="initYearSelected"
          [formControlName]="initYControl">
          <div *ngFor="let year of years">
            <mat-option [value]="year">{{ year }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Mes</mat-label>
        <mat-select 
          [disabled]="inCourse"
          [(value)]="endMonthSelected"
          [formControlName]="endMControl">
          <div *ngFor="let month of months">
            <mat-option [value]="month">{{ month }}</mat-option>
          </div>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Año</mat-label>
        <mat-select 
          [disabled]="inCourse"
          [(value)]="endYearSelected"
          [formControlName]="endYControl">
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
      {{ initMonthSelected }}
      {{ initYearSelected }}
      {{ endMonthSelected }}
      {{ endYearSelected }}
      {{ inCourse }}
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
  @Input() public initMControl!: string;
  @Input() public initYControl!: string;
  @Input() public endMControl!: string;
  @Input() public endYControl!: string;
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
  protected initMonthSelected: string = "";
  protected initYearSelected: number | undefined;
  protected endMonthSelected: string = "";
  protected endYearSelected: number | undefined;
  protected inCourse: boolean = false;
  
  constructor() { }
  
  ngOnInit() {
    this.loadYears();
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
