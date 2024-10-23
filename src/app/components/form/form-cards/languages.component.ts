import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { LevelComponent } from "src/app/shared/level/level.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'languages',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Idiomas
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('languages')">
            Añadir Idiomas
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('languages') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('languages')" @slideInOut>
        <div formArrayName="languages">
            <!-- <div *ngFor="let control of languages.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('languages', 'i')" controlName="language"
                    label="Idioma">
                </text-line>
                <level [groupName]="getFormGroup('languages', 'i')" controlName="level" label="Nivel">
                </level>
                <!-- <button mat-button (click)="removeFormField('languages', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('languages')">
                add
            </button> -->
        </div>
    </mat-card-content>
</mat-card>`,
    styles: [''],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ParagraphComponent,
        InitEndDateComponent,
        NumInputComponent,
        TextLineComponent,
        LevelComponent
    ]
})
export class LanguagesComponent {
    // Trash methods
    // The parameter 'i' has to be corrected, the original method receives a number, which is an index for the real FormGroup
    getFormGroup(parameter: string, i: string): FormGroup { 
        const data = new FormGroup('a');
        return data
    }
    toggleVisible(parameter: string) {

    }
    getCardIsVisible(parameter: string) {

    }
}