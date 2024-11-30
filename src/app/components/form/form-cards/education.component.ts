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
        <div class="container" [formGroup]="cvFormGroup">
            <div class="header">
                <h2>Educación</h2>
            </div>
            <div class="input-group-container" formArrayName="education">
                <div
                class="input-list-container"
                *ngFor="let control of educationGroup.controls, let i=index"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="grade"
                        label="Título">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="school"
                        label="Escuela">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="type"
                        label="Tipo">
                        </text-line>
                    </div>
                    <div class="input">
                        <num-input
                        [groupName]="getFormGroup(i)"
                        controlName="average"
                        label="Promedio académico">
                        </num-input>
                    </div>
                    <div class="date-container">    
                        <init-end-date
                        [groupName]="getFormGroup(i)"
                        initMControl="edInitMonth"
                        initYControl="edInitYear"
                        endMControl="edEndMonth"
                        endYControl="edEndYear">
                        </init-end-date>
                    </div>
                    <div class="paragraph-container">
                        <paragraph
                        [groupName]="getFormGroup(i)"
                        controlName="description">
                        </paragraph>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
            .container {
                background-color: aquamarine;
                box-sizing: border-box; /* evita que las cajas internas sean empujadas fuera del contenedor por el padding; */
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                margin: 0;
                padding: 10%;
                width: 100%;
                height: 100vh; /* Otorga una medida precisa para calcular la altura y manejar el overflow-y */
                overflow-x: hidden; /* Oculta un overflow-x existente que debería solucionar */
                overflow-y: auto;
            }
            .header {
                border: 2px solid black;
                width: 100%;
                margin-top: 5%;
                margin-bottom: 5%;
            }
            h2 {
                margin-left: 5%;
                margin-top: 2%;
            }
            .input-group-container {
                /* background-color: green; */
                width: 100%;
                box-sizing: border-box;
            }
            .input-list-container {
                border: 2px solid black;
                width: 100%;
                height: auto;
                box-sizing: border-box;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 3%;
                margin-bottom: 3%;
            }
            .input {
                width: 100%;
                border: 2px solid grey;
                transform: scale(0.9);
                box-sizing: border-box;
            }
            .date-container {
                width: 100%;
                border: 2px solid grey;
                box-sizing: border-box;
                grid-column: 1 / 3;
                margin-top: 3%;
                margin-bottom: 3%;
            }
            .paragraph-container {
                width: 100%;
                border: 2px solid grey;
                box-sizing: border-box;
                grid-column: 1 / 3;
                margin-top: 3%;
                margin-bottom: 3%;
            }
        `],
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