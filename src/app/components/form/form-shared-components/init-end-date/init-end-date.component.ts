import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'init-end-date',
  template: `
    <div
    [formGroup]="groupName"
    class="form-group-container"
    [ngClass]="{'form-group-container-desktop': !isMobile, 'form-group-container-mobile': isMobile}">
      <div class="ed-start-container">
        <div class="form-field-container">
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
        </div>
        <div>
          <button class="clear-button" mat-icon-button (click)="clearInitDate()">
            <mat-icon>restart_alt</mat-icon>
          </button>
        </div>
      </div>
      <div class="ed-end-container">
        <div class="form-field-container">
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
            color="primary"
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
        <div>
          <button class="clear-button" mat-icon-button (click)="clearEndDate()">
            <mat-icon>restart_alt</mat-icon>
          </button>
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
        align-items: center;
        justify-content: center;
        border: .1rem solid var(--black-overlay);
        border-radius: 4px;
        margin-right: .5rem
      }
      .ed-end-container {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border: .1rem solid var(--black-overlay);
        border-radius: 4px;
        margin-left: .5rem;
      }
      .date-title {
        font-size: .9rem;
        padding: .2rem; 
        margin-top: 1rem;
        color: var(--black);
        font-weight: 500;
      }
      .form-field-container {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .form-field {
        transform: scale(0.8);
      }
      .clear-button {
        transform: scale(0.8);
        margin-bottom: 1.5rem;
        background-color: var(--white-variant);
        color: var(--cobalt-blue);
      }
      .checkbox-container {
        width: 100%;
        text-align: center;
        align-self: start;
        margin-bottom: 1rem;
      }
      .checkbox {
        color: black;
      }
      .checkbox span {
        color: var(--black);
        line-height: 3;
      }
      `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class InitEndDateComponent implements OnInit, OnDestroy {
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
  isMobileSubscription!: Subscription;
  isMobile: boolean = true;
  
  constructor(private breakpointObserver: BreakpointObserver) { }
  
  ngOnInit() {
    this.isMobileSubscription = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
    this.loadYears();
  }
  
  loadYears(): void {
    const date: Date = new Date;
    const actualYear: number = date.getFullYear();
    const limitYear: number = 1950;
    for (let i = actualYear; i >= limitYear; i--) {
      this.years.push(i);
    }
  }

  clearInitDate(): void {
    this.groupName.controls[this.initMControl].reset();
    this.groupName.controls[this.initYControl].reset();
  }
  clearEndDate(): void {
    this.groupName.controls[this.endMControl].reset();
    this.groupName.controls[this.endYControl].reset();
  }
  
  alternateInCourse(): void {
    if (this.inCourse) {
      this.groupName.controls['inCourse'].setValue('true');
    } else {
      this.groupName.controls['inCourse'].setValue('false');
    }
  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }
}
