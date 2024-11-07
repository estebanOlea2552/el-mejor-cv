import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { LevelComponent } from "src/app/shared/level/level.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'vol-works',
    template: `
    <mat-card class="form-card">
    <mat-card-header>
        <mat-card-title>
            Voluntariados
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible()">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content *ngIf="isVisible" @slideInOut>
        <div [formGroup]="cvFormGroup">
        <div formArrayName="volunteerWorks">
            <div *ngFor="let control of volWorkGroup.controls, let i=index" [formGroupName]="i">
                <text-line [groupName]="getFormGroup(i)" controlName="position"
                    label="Puesto">
                </text-line>
                <text-line [groupName]="getFormGroup(i)"
                    controlName="organization" label="Organización">
                </text-line>
                <init-end-date [groupName]="getFormGroup(i)"
                    initMControl="vWInitMonth" initYControl="vWInitYear" endMControl="vWEndMonth"
                    endYControl="vWEndYear">
                </init-end-date>
                <paragraph [groupName]="getFormGroup(i)"
                    controlName="description">
                </paragraph>
                <button mat-button (click)="removeVolWork(i)">
                    remove
                </button>
            </div>
            <button mat-button (click)="addVolWork()">
                add
            </button>
        </div>
        </div>
    </mat-card-content>
</mat-card>`,
    styles: [``],
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
        LevelComponent,
        MatButtonModule
    ],
    animations: [ slideInOutAnimation ]
})
export class VolunteerWorksComponent {
    cvFormGroup!: FormGroup;
    volWorkGroup!: FormArray;
    volWorkDataInit: any = cvDataInit.volunteerWorks;
    isVisible: boolean = false;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.volWorkGroup = this.cvFormGroup.get('volunteerWorks') as FormArray;
        this.createVolWork();
    }

    toggleVisible() {
        this.isVisible = !this.isVisible;
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