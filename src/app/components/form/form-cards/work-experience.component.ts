import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'work-exp',
    template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            Experiencia Laboral
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible()">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content *ngIf="isVisible" @slideInOut>
        <div [formGroup]="cvFormGroup">
        <div formArrayName="workExperience">
            <div *ngFor="let experience of wExpGroup.controls, let i=index"
                [formGroupName]="i">
                <text-line 
                    [groupName]="getFormGroup(i)" 
                    controlName="position"
                    label="Posición">
                </text-line>
                <text-line
                    [groupName]="getFormGroup(i)"
                    controlName="organization"
                    label="Empresa">
                </text-line>
                <text-line
                    [groupName]="getFormGroup(i)"
                    controlName="location"
                    label="Ubicación">
                </text-line>
                <text-line
                    [groupName]="getFormGroup(i)"
                    controlName="workingDay"
                    label="Jornada">
                </text-line>
                <init-end-date 
                    [groupName]="getFormGroup(i)"
                    initMControl="wExpInitMonth"
                    initYControl="wExpInitYear"
                    endMControl="wExpEndMonth"
                    endYControl="wExpEndYear">
                </init-end-date>
                <paragraph
                    [groupName]="getFormGroup(i)"
                    controlName="description">
                </paragraph>
                <button mat-button (click)="removeWExp(i)">
                    remove
                </button>
            </div>
            <button mat-button (click)="addWExp()">
                add
            </button>
        </div>
        </div>
    </mat-card-content>
    </mat-card>
    `,
    styles: [`
            .form-card {
                background-color: var(--light-gray);
                margin-top: 3%;
                padding: 1%;
                border-radius: 1%;
            }
        `],
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
        MatButtonModule
    ],
    animations: [ slideInOutAnimation ]
})
export class WorkExperienceComponent {
    cvFormGroup!: FormGroup;
    wExpGroup!: FormArray;
    wExpDataInit: any = cvDataInit.workExperience;
    isVisible: boolean = false;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.wExpGroup = this.cvFormGroup.get('workExperience') as FormArray;
        this.createWExp();
    }

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

    getFormGroup(index: number): FormGroup {
        return this.wExpGroup.at(index || 0) as FormGroup;
    }

    createWExp(): FormGroup {
        return this.fb.group({
            position: [this.wExpDataInit.map((wExp: any) => wExp.position) || ''],
            organization: [this.wExpDataInit.map((wExp: any) => wExp.organization) || ''],
            location: [this.wExpDataInit.map((wExp: any) => wExp.location) || ''],
            workingDay: [this.wExpDataInit.map((wExp: any) => wExp.worKingDay) || ''],
            wExpInitMonth: [this.wExpDataInit.map((wExp: any) => wExp.wExpInitMonth) || ''],
            wExpInitYear: [this.wExpDataInit.map((wExp: any) => wExp.wExpInitYear) || ''],
            wExpEndMonth: [this.wExpDataInit.map((wExp: any) => wExp.wExpEndMonth) || ''],
            wExpEndYear: [this.wExpDataInit.map((wExp: any) => wExp.wExpEndYear) || ''],
            inCourse: [this.wExpDataInit.map((wExp: any) => wExp.inCourse) || ''],
            description: [this.wExpDataInit.map((wExp: any) => wExp.description) || '']
        })
    }

    addWExp(): void {
        this.wExpGroup.push(this.createWExp());
    }

    removeWExp(index: number): void {
        this.wExpGroup.removeAt(index);
    }
}