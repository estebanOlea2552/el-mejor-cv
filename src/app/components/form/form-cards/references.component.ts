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
    selector: 'references',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Referencias
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('references')">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('references') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('references')" @slideInOut>
        <div formArrayName="references">
            <!-- <div *ngFor="let control of references.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('references', 'i')" controlName="name"
                    label="Nombre Completo">
                </text-line>
                <text-line [groupName]="getFormGroup('references', 'i')" controlName="organization"
                    label="Organización">
                </text-line>
                <text-line [groupName]="getFormGroup('references', 'i')" controlName="email"
                    label="Email">
                </text-line>
                <text-line [groupName]="getFormGroup('references', 'i')" controlName="phone"
                    label="Teléfono">
                </text-line>
                <!-- <button mat-button (click)="removeFormField('references', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('references')">
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
export class ReferencesComponent {
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