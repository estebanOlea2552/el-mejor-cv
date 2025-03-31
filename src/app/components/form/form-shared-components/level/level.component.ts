import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/state/app.state';
import { templateLangSelector } from 'src/app/shared/state/selectors/template-lang.selector';
import {
  ENGLISH_TEMPLATE,
  SPANISH_TEMPLATE,
} from 'src/app/model/template-lang';

@Component({
  selector: 'level',
  template: `
    <mat-form-field [formGroup]="groupName">
      <mat-label>{{ label }}</mat-label>
      <mat-select [(value)]="levelSelected" [formControlName]="controlName">
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
        (click)="clearInput()"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [
    `
      .clear-button {
        transform: scale(0.8);
        color: var(--light-red);
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LevelComponent implements OnInit {
  @Input() groupName!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() isLangLevel!: boolean;
  templateLangSubscription!: Subscription;
  basicLevels: string[] = [];
  langLevels: string[] = [];
  levelSelected: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.templateLangSubscription = this.store
      .select(templateLangSelector)
      .subscribe((lang: string) => {
        if (lang === 'spanish') {
          this.basicLevels = SPANISH_TEMPLATE.skills.listOfLevels;
          this.langLevels = SPANISH_TEMPLATE.languages.listOfLevels;
        } else if (lang === 'english') {
          this.basicLevels = ENGLISH_TEMPLATE.skills.listOfLevels;
          this.langLevels = ENGLISH_TEMPLATE.languages.listOfLevels;
        } else {
          console.error('LevelComponent Error: Invalid Language Selection');
        }
      });
  }

  clearInput() {
    this.groupName.get(this.controlName)?.setValue('');
  }
}
