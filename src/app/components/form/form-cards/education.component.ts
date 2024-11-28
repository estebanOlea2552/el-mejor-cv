import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";
import { cvDataInit } from 'src/app/model/cv-data-init';

@Component({
    selector: 'education',
    template: `
        <mat-card class="form-card">
            <mat-card-header class="form-card-header">
                <mat-card-title>
                    Educación
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="form-card-content">
                <div [formGroup]="cvFormGroup">
                    <div formArrayName="education">
                        <div *ngFor="let control of educationGroup.controls, let i=index" [formGroupName]="i">
                            <text-line
                                [groupName]="getFormGroup(i)"
                                controlName="grade"
                                label="Título">
                            </text-line>
                            <text-line
                                [groupName]="getFormGroup(i)"
                                controlName="school"
                                label="Escuela">
                            </text-line>
                            <text-line
                                [groupName]="getFormGroup(i)"
                                controlName="type"
                                label="Tipo">
                            </text-line>
                            <num-input
                                [groupName]="getFormGroup(i)"
                                controlName="average"
                                label="Promedio académico">
                            </num-input>
                            <init-end-date
                                [groupName]="getFormGroup(i)"
                                initMControl="edInitMonth"
                                initYControl="edInitYear"
                                endMControl="edEndMonth"
                                endYControl="edEndYear">
                            </init-end-date>
                            <paragraph
                                [groupName]="getFormGroup(i)"
                                controlName="description">
                            </paragraph>
                            <button mat-button (click)="removeEducation(i)">
                                remove
                            </button>
                        </div>
                        <button mat-button (click)="addEducation()">
                            add
                        </button>
                    </div>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styles: [``],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        ParagraphComponent,
        InitEndDateComponent,
        NumInputComponent,
        TextLineComponent,
    ],
})
export class EducationComponent implements OnInit {
    cvFormGroup!: FormGroup;
    educationGroup!: FormArray;
    eduDataInit: any = cvDataInit.education;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.educationGroup = this.cvFormGroup.get('education') as FormArray;
        this.createEducation();
    }

    getFormGroup(index: number): FormGroup {
        return this.educationGroup.at(index || 0) as FormGroup;
    }

    createEducation(): FormGroup {
        return this.fb.group({
            grade: [this.eduDataInit.map((edu: any) => edu.grade) || ''],
            school: [this.eduDataInit.map((edu: any) => edu.school) || ''],
            type: [this.eduDataInit.map((edu: any) => edu.type) || ''],
            average: [this.eduDataInit.map((edu: any) => edu.average) || ''],
            edInitMonth: [this.eduDataInit.map((edu: any) => edu.edInitMonth) || ''],
            edInitYear: [this.eduDataInit.map((edu: any) => edu.edInitYear) || ''],
            edEndMonth: [this.eduDataInit.map((edu: any) => edu.edEndMonth) || ''],
            edEndYear: [this.eduDataInit.map((edu: any) => edu.edEndYear) || ''],
            inCourse: [this.eduDataInit.map((edu: any) => edu.inCourse) || ''],
            description: [this.eduDataInit.map((edu: any) => edu.description) || '']
        })
    }

    addEducation(): void {
        this.educationGroup.push(this.createEducation());
    }

    removeEducation(index: number): void {
        this.educationGroup.removeAt(index);
    }
}