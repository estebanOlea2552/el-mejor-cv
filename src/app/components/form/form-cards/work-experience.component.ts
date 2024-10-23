import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'work-exp',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Experiencia Laboral
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('workExp')">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('workExp') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('workExp')" @slideInOut>
        <div formArrayName="workExperience">
            <!-- <div *ngFor="let experience of workExperience.controls, let i=index" -->
                [formGroupName]="i">
                <text-line [groupName]="getFormGroup('workExperience', 'i')" controlName="position"
                    label="Posición">
                </text-line>
                <text-line [groupName]="getFormGroup('workExperience', 'i')"
                    controlName="organization" label="Empresa">
                </text-line>
                <text-line [groupName]="getFormGroup('workExperience', 'i')" controlName="location"
                    label="Ubicación">
                </text-line>
                <text-line [groupName]="getFormGroup('workExperience', 'i')" controlName="workingDay"
                    label="Jornada">
                </text-line>
                <init-end-date [groupName]="getFormGroup('workExperience', 'i')"
                    initMControl="wExpInitMonth" initYControl="wExpInitYear"
                    endMControl="wExpEndMonth" endYControl="wExpEndYear">
                </init-end-date>
                <paragraph [groupName]="getFormGroup('workExperience', 'i')"
                    controlName="description">
                </paragraph>
                <!-- <button mat-button (click)="removeFormField('workExperience', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('workExperience')">
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
        TextLineComponent
    ]
})
export class WorkExperienceComponent {
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