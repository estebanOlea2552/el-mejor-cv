import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        <h3>Fecha de inicio</h3>
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
      </div>
      <div class="ed-end-container">
      <h3>Fecha de finalización</h3>
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
          [checked]="inCourse" 
          (change)="this.inCourse = !this.inCourse;"
          class="checkbox">
            <span>Presente</span>
          </mat-checkbox>
        </div>
      </div>
    </div>
  `,
  styles: [`
      .form-group-container {
        width: auto;
        box-sizing: border-box;
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
        /* border: 2px solid grey; */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ed-end-container {
        /* border: 2px solid grey; */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .form-field {
        /* border: 2px solid grey; */
        transform: scale(0.9);
      }
      .checkbox-container {
        width: 100%;
        align-self: start;
        margin-left: 5%;
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
  protected isMobile: boolean = true;
  
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
}
