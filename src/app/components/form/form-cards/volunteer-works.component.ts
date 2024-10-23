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
    selector: 'vol-works',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Voluntariados
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('volunteerWorks')">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('volunteerWorks') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('volunteerWorks')" @slideInOut>
        <div formArrayName="volunteerWorks">
            <!-- <div *ngFor="let control of volunteerWorks.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('volunteerWorks', 'i')" controlName="position"
                    label="Puesto">
                </text-line>
                <text-line [groupName]="getFormGroup('volunteerWorks', 'i')"
                    controlName="organization" label="Organización">
                </text-line>
                <init-end-date [groupName]="getFormGroup('volunteerWorks', 'i')"
                    initMControl="vWInitMonth" initYControl="vWInitYear" endMControl="vWEndMonth"
                    endYControl="vWEndYear">
                </init-end-date>
                <paragraph [groupName]="getFormGroup('volunteerWorks', 'i')"
                    controlName="description">
                </paragraph>
                <!-- <button mat-button (click)="removeFormField('volunteerWorks', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('volunteerWorks')">
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
export class VolunteerWorksComponent {
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