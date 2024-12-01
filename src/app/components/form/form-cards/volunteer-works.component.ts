import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'vol-works',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <div class="header">
                <h2>Trabajos Voluntarios</h2>
            </div>
            <div class="input-group-container" formArrayName="volunteerWorks">
                <div
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let control of volWorkGroup.controls, let i=index"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="position"
                        label="Puesto">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="organization"
                        label="Organización">
                        </text-line>
                    </div>
                    <div class="date-container">    
                        <init-end-date
                        [groupName]="getFormGroup(i)"
                        initMControl="vWInitMonth"
                        initYControl="vWInitYear"
                        endMControl="vWEndMonth"
                        endYControl="vWEndYear">
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
                width: 100%;
                box-sizing: border-box;
            }
            .input-list-container {
                border: 2px solid black;
                width: 100%;
                height: auto;
                box-sizing: border-box;
                padding: 3%;
                margin-bottom: 3%;
            }
            .input-list-container-desktop {
                display: grid;
                grid-template-columns: 1fr 1fr;
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
        ParagraphComponent,
        InitEndDateComponent,
        TextLineComponent,
        MatButtonModule
    ]
})
export class VolunteerWorksComponent {
    cvFormGroup!: FormGroup;
    volWorkGroup!: FormArray;
    volWorkDataInit: any = cvDataInit.volunteerWorks;
    isMobile: boolean = true;

    constructor(
        private fb: FormBuilder, 
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.volWorkGroup = this.cvFormGroup.get('volunteerWorks') as FormArray;
        this.createVolWork();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    getFormGroup(index: number): FormGroup {
        return this.volWorkGroup.at(index || 0) as FormGroup;
    }

    createVolWork(): FormGroup {
        return this.fb.group({
            position: [this.volWorkDataInit.map((volWork: any) => volWork.position) || ''],
            organization: [this.volWorkDataInit.map((volWork: any) => volWork.organization) || ''],
            vWInitMonth: [this.volWorkDataInit.map((volWork: any) => volWork.vWInitMonth) || ''],
            vWInitYear: [this.volWorkDataInit.map((volWork: any) => volWork.vWInitYear) || ''],
            vWEndMonth: [this.volWorkDataInit.map((volWork: any) => volWork.vWEndMonth) || ''],
            vWEndYear: [this.volWorkDataInit.map((volWork: any) => volWork.vWEndYear) || ''],
            inCourse: [this.volWorkDataInit.map((volWork: any) => volWork.inCourse) || ''],
            description: [this.volWorkDataInit.map((volWork: any) => volWork.description) || '']
        });
    }

    addVolWork(): void {
        this.volWorkGroup.push(this.createVolWork());
    }

    removeVolWork(index: number): void {
        this.volWorkGroup.removeAt(index);
    }
}