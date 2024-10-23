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
    selector: 'links',
    template: `<mat-card>
    <mat-card-header>
        <mat-card-title>
            Enlaces
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible('links')">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
        <span>{{ getCardIsVisible('links') }}</span>
    </mat-card-header>
    <mat-card-content *ngIf="getCardIsVisible('links')" @slideInOut>
        <div formArrayName="links">
            <!-- <div *ngFor="let control of links.controls, let i=index" [formGroupName]="i"> -->
                <text-line [groupName]="getFormGroup('links', 'i')" controlName="link" label="Enlace">
                </text-line>
                <!-- <button mat-button (click)="removeFormField('links', i)">
                    remove
                </button> -->
            <!-- </div> -->
            <!-- <button mat-button (click)="addFormField('links')">
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
export class LinksComponent {
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