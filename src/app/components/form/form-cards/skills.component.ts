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
    selector: 'skills',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Habilidades
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('skills')">
            Añadir Habilidades
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('skills') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('skills')" @slideInOut>
        <div formArrayName="skills">
            <!-- <div *ngFor="let skill of skills.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('skills', 'i')" controlName="skill"
                    label="Habilidad">
                </text-line>
                <level [groupName]="getFormGroup('skills', 'i')" controlName="level" label="Nivel">
                </level>
                <!-- <button mat-button (click)="removeFormField('skills', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('skills')">
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
export class SkillsComponent {
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