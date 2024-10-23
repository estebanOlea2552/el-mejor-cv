import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'education',
    template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            Educación
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('education')">
            Añadir Estudios
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('education') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('education')" @slideInOut>
        <div formArrayName="education">
            <!-- <div *ngFor="let control of education.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('education', 'i')" controlName="grade"
                    label="Título">
                </text-line>
                <text-line [groupName]="getFormGroup('education', 'i')" controlName="school"
                    label="Escuela">
                </text-line>
                <text-line [groupName]="getFormGroup('education', 'i')" controlName="type"
                    label="Tipo">
                </text-line>
                <num-input [groupName]="getFormGroup('education', 'i')" controlName="average"
                    label="Promedio académico">
                </num-input>
                <init-end-date [groupName]="getFormGroup('education', 'i')" initMControl="edInitMonth"
                    initYControl="edInitYear" endMControl="edEndMonth" endYControl="edEndYear">
                </init-end-date>
                <paragraph [groupName]="getFormGroup('education', 'i')" controlName="description">
                </paragraph>
                <!-- <button mat-button (click)="removeFormField('education', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('education')">
                add
            </button> -->
        </div>
    </mat-card-content>
</mat-card>
`,
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
        TextLineComponent
    ]
})
export class EducationComponent {
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