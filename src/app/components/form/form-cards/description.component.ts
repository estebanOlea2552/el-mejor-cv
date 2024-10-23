import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";

@Component({
    selector: 'description',
    template: `
        <mat-card>
            <mat-card-header>
                <mat-card-title>
                    Resúmen Profesional
                </mat-card-title>
                <mat-card-subtitle (click)="toggleVisible('professionalSum')">
                    Añadir resúmen
                </mat-card-subtitle>
                    <span>{{ getCardIsVisible('professionalSum') }}</span>
            </mat-card-header>
            <mat-card-content *ngIf="getCardIsVisible('professionalSum')" @slideInOut>
                <paragraph [groupName]="getFormGroup('personalInfo')" controlName="professionalSummary">
                </paragraph>
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
        ParagraphComponent
    ]
})
export class DescriptionComponent {
    
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