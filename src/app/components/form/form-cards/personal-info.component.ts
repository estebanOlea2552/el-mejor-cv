import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';

import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'personal-info',
    template: `
    <mat-card>
        <mat-card-header>
            <mat-card-title>
                Información General
            </mat-card-title>
            <mat-card-subtitle (click)="toggleVisible('personalInfo')">
                Añadir resúmen
            </mat-card-subtitle>
            <span>{{ getCardIsVisible('personalInfo') }}</span>
        </mat-card-header>
        <mat-card-content *ngIf="getCardIsVisible('personalInfo')" @slideInOut>
            <text-line
                [groupName]="getFormGroup('personalInfo')"
                controlName="name"
                label="Nombre">
            </text-line>
            <text-line
                [groupName]="getFormGroup('personalInfo')"
                controlName="lastname"
                label="Apellido">
            </text-line>
            <text-line
                [groupName]="getFormGroup('personalInfo')"
                controlName="jobPosition"
                label="Puesto">
            </text-line>
            <text-line
                [groupName]="getFormGroup('personalInfo')"
                controlName="email"
                label="Email">
            </text-line>
            <text-line
                [groupName]="getFormGroup('personalInfo')"
                controlName="phone"
                label="Teléfono">
            </text-line>

        <!-- More Info -->
        <mat-accordion>
            <mat-expansion-panel>
                <mat-expansion-panel-header>
                    <mat-panel-title>Agregar información extra</mat-panel-title>
                </mat-expansion-panel-header>
                <text-line [groupName]="getFormGroup('personalInfo')" controlName="country"
                    label="País">
                </text-line>
                <text-line [groupName]="getFormGroup('personalInfo')" controlName="stateProvince"
                    label="Estado/Provincia">
                </text-line>
                <text-line [groupName]="getFormGroup('personalInfo')" controlName="city"
                    label="Ciudad">
                </text-line>
                <text-line [groupName]="getFormGroup('personalInfo')" controlName="nationality"
                    label="Nacionalidad">
                </text-line>
                <num-input [groupName]="getFormGroup('personalInfo')" controlName="age"
                    label="Edad">
                </num-input>
            </mat-expansion-panel>
        </mat-accordion>
    </mat-card-content>
</mat-card>`,
    styles: [''],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        NumInputComponent,
        MatExpansionModule
    ]
})
export class PersonalInfoComponent {

    // Trash methods
    getFormGroup(parameter: string): FormGroup { 
        const data = new FormGroup('a');
        return data
    }
    toggleVisible(parameter: string) {

    }
    getCardIsVisible(parameter: string) {

    }

}