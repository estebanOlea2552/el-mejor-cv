import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
import { FormService } from "src/app/services/form.service";

import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'personal-info',
    template: `
    <mat-card class="form-card">
        <mat-card-header>
            <mat-card-title>
                Información General
            </mat-card-title>
        </mat-card-header>
        <mat-card-content>
            <text-line
                [groupName]="personalInfoGroup"
                controlName="name"
                label="Nombre">
            </text-line>
            <text-line
                [groupName]="personalInfoGroup"
                controlName="lastname"
                label="Apellido">
            </text-line>
            <text-line
                [groupName]="personalInfoGroup"
                controlName="jobPosition"
                label="Puesto">
            </text-line>
            <text-line
                [groupName]="personalInfoGroup"
                controlName="email"
                label="Email">
            </text-line>
            <text-line
                [groupName]="personalInfoGroup"
                controlName="phone"
                label="Teléfono">
            </text-line>

        <!-- More Info -->
        <mat-accordion>
            <mat-expansion-panel>
                <mat-expansion-panel-header>
                    <mat-panel-title>Agregar información extra</mat-panel-title>
                </mat-expansion-panel-header>
                <text-line [groupName]="personalInfoGroup" controlName="country"
                    label="País">
                </text-line>
                <text-line [groupName]="personalInfoGroup" controlName="stateProvince"
                    label="Estado/Provincia">
                </text-line>
                <text-line [groupName]="personalInfoGroup" controlName="city"
                    label="Ciudad">
                </text-line>
                <text-line [groupName]="personalInfoGroup" controlName="nationality"
                    label="Nacionalidad">
                </text-line>
                <num-input [groupName]="personalInfoGroup" controlName="age"
                    label="Edad">
                </num-input>
            </mat-expansion-panel>
        </mat-accordion>
    </mat-card-content>
</mat-card>`,
    styles: [``],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        NumInputComponent,
        MatExpansionModule
    ],
})
export class PersonalInfoComponent implements OnInit {
    cvFormGroup!: FormGroup;
    personalInfoGroup!: FormGroup;

    constructor(private form: FormService){}

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.personalInfoGroup = this.cvFormGroup.get('personalInfo') as FormGroup;
    }
}