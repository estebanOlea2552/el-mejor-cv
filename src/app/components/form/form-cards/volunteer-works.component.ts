import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'vol-works',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <h2>Trabajos Voluntarios</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="volunteerWorks">
                <mat-card
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
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeVolWork(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetVolWork(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button mat-flat-button (click)="addVolWork()">
                    <mat-icon>add</mat-icon>
                    Añadir voluntariado
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-flat-button class="prev" (click)="changeSelectedCard('lang')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-flat-button class="next" (click)="changeSelectedCard('ref')">
                    Siguiente
                    <mat-icon>chevron_right</mat-icon>
                </button>
            </div>
        </div>
    `,
    styles: [`
            .container {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                margin: 0;
                padding: 10%;
                width: 100%;
                height: 100vh;
                overflow-x: hidden;
                overflow-y: auto;
            }
            .header {
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
                transform: scale(0.9);
                box-sizing: border-box;
            }
            .date-container {
                width: 100%;
                border-radius: 4px;
                box-sizing: border-box;
                grid-column: 1 / 3;
                margin-top: 3%;
                margin-bottom: 3%;
            }
            .paragraph-container {
                width: 100%;
                box-sizing: border-box;
                grid-column: 1 / 3;
                margin-top: 3%;
                margin-bottom: 3%;
            }
            .card-button-container-mobile {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .card-button-container-mobile > button {
                width: 70%;
                margin: 1%;
                transform: scale(0.9);
            }
            .card-button-container-desktop {
                grid-column: 1 / 3;
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
            }
            .card-button-container-desktop > button {
                width: 100%;
                margin: 1%;
                transform: scale(0.9);
            }
            .prev-next-container-mobile {
                width: 80%;
            }
            .prev-next-container-desktop {
                width: 50%;
            }
            .prev-next-container {
                box-sizing: border-box;
                position: absolute;
                bottom: 1%;
                display: flex;
                justify-content: space-between;
            }
            .prev {
                margin-left: 3%;
            }
            .next {
                margin-right: 3%;
            }
            .next mat-icon {
                order: 2;
                margin-left: 8px;
            }
            .next span {
                order: 1;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
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
    @Output() selectedCard = new EventEmitter<string>();

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

    resetVolWork(index: number): void {
        const volWorkGroup = this.getFormGroup(index);
        volWorkGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}