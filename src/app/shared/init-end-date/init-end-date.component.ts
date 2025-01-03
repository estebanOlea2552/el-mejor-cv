import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'init-end-date',
  template: `
    <div
    [formGroup]="groupName"
    class="form-group-container"
    [ngClass]="{'form-group-container-desktop': !isMobile, 'form-group-container-mobile': isMobile}">
      <div class="ed-start-container">
        <span class="date-title">Fecha de inicio</span>
        <mat-form-field class="form-field">
          <mat-label>Mes</mat-label>
          <mat-select
            [(value)]="initMonthSelected"
            [formControlName]="initMControl">
            <div *ngFor="let month of months">
              <mat-option [value]="month">{{ month }}</mat-option>
            </div>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="form-field">
          <mat-label>Año</mat-label>
          <mat-select 
            [(value)]="initYearSelected"
            [formControlName]="initYControl">
            <div *ngFor="let year of years">
              <mat-option [value]="year">{{ year }}</mat-option>
            </div>
          </mat-select>
        </mat-form-field>
        <div>
          <button mat-flat-button>Limpiar</button>
        </div>
      </div>
      <div class="ed-end-container">
        <span class="date-title">Fecha de finalización</span>
        <mat-form-field class="form-field">
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
        <mat-form-field class="form-field">
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
        <div class="checkbox-container">
          <mat-checkbox
          class="checkbox"
          [checked]="inCourse"
          (click)="alternateInCourse()"
          (change)="this.inCourse = !this.inCourse">
            <span>Presente</span>
          </mat-checkbox>
          <input
          class="display-none"
          type="text"
          name="inCourse"
          id="inCourse"
          formControlName="inCourse">
        </div>
      </div>
    </div>
  `,
  styles: [`
      .display-none {
        display: none;
      }
      .form-group-container {
        width: auto;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
      .form-group-container-mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .form-group-container-desktop {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      .ed-start-container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ed-end-container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .date-title {
        padding: 3%;
        color: rgba(0, 0, 0, 0.87);
        font-weight: 500;
      }
      .form-field {
        transform: scale(0.9);
      }
      .checkbox-container {
        width: 100%;
        text-align: center;
        align-self: start;
      }
    `],
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
  @Input() groupName!: FormGroup;
  @Input() initMControl!: string;
  @Input() initYControl!: string;
  @Input() endMControl!: string;
  @Input() endYControl!: string;
  months: string[] = [
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
  years: number[] = [];
  initMonthSelected: string = "";
  initYearSelected: number | undefined;
  endMonthSelected: string = "";
  endYearSelected: number | undefined;
  inCourse: boolean = false;
  isMobile: boolean = true;
  
  constructor(private breakpointObserver: BreakpointObserver) { }
  
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
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

  alternateInCourse(): void {
    if (this.inCourse) {
      this.groupName.controls['inCourse'].setValue('true');
    } else {
      this.groupName.controls['inCourse'].setValue('false');
    }
  }
}
