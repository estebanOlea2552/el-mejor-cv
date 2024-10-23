import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'certifications',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Exámenes y Certificaciones
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('certifications')">
            Añadir Exámenes y certificaciones
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('certifications') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('certifications')" @slideInOut>
        <div formArrayName="certifications">
            <!-- <div *ngFor="let control of certifications.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('certifications', 'i')" controlName="title"
                    label="Título">
                </text-line>
                <text-line [groupName]="getFormGroup('certifications', 'i')" controlName="institution"
                    label="Institución">
                </text-line>
                <num-input [groupName]="getFormGroup('certifications', 'i')" controlName="average"
                    label="Puntaje">
                </num-input>
                <!-- <button mat-button (click)="removeFormField('certifications', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('certifications')">
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
export class CertificationsComponent {
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