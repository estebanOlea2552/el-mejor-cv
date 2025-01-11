import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'work-exp',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <h2>Experiencia Laboral</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="workExperience">
                <mat-card
                #formArray
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let experience of wExpGroup.controls, let i=index"
                [formGroupName]="i">
                    <div class="input">
                        <text-line 
                        [groupName]="getFormGroup(i)" 
                        controlName="position"
                        label="Posición">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="organization"
                        label="Empresa">
                        </text-line>
                    </div>
                    
                    <div class="date-container">
                        <init-end-date 
                        [groupName]="getFormGroup(i)"
                        initMControl="wExpInitMonth"
                        initYControl="wExpInitYear"
                        endMControl="wExpEndMonth"
                        endYControl="wExpEndYear">
                        </init-end-date>
                    </div>
                    <mat-accordion class="accordion-container">
                        <mat-expansion-panel>
                            <mat-expansion-panel-header>
                                Agregar más información
                            </mat-expansion-panel-header>
                            <div class="accordion-content" [ngClass]="{'accordion-content-desktop': !isMobile}">
                                <div class="input">
                                    <text-line
                                    [groupName]="getFormGroup(i)"
                                    controlName="location"
                                    label="Ubicación">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <text-line
                                    [groupName]="getFormGroup(i)"
                                    controlName="workingDay"
                                    label="Jornada">
                                    </text-line>
                                </div>
                                <div class="paragraph-container">
                                    <paragraph
                                    [groupName]="getFormGroup(i)"
                                    controlName="description">
                                    </paragraph>
                                </div>
                            </div>
                        </mat-expansion-panel>
                    </mat-accordion>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeWExp(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetWExp(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button mat-flat-button (click)="addWExp()">
                    <mat-icon>add</mat-icon>
                    Añadir experiencia laboral
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-flat-button class="prev" (click)="changeSelectedCard('desc')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-flat-button class="next" (click)="changeSelectedCard('ed')">
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
            margin-top: 2rem;
            margin-bottom: 2rem;
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
            box-sizing: border-box;
            grid-column: 1 / 3;
            margin-top: 3%;
            margin-bottom: 3%;
        }
        .accordion-container {
            grid-column: 1 / 3;
            box-sizing: border-box;
            width: 100%;
            margin-top: 3%;
        }
        .accordion-content {
            box-sizing: border-box;
            width: 100%;
        }
        .accordion-content-desktop {
            display: grid;
            grid-template-columns: 1fr 1fr;
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
            display: flex;
            justify-content: space-around;
            margin-top: 4rem;
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
        ParagraphComponent,
        InitEndDateComponent,
        TextLineComponent,
        MatButtonModule,
        MatExpansionModule
    ]
})
export class WorkExperienceComponent {
    cvFormGroup!: FormGroup;
    wExpGroup!: FormArray;
    wExpDataInit: any = cvDataInit.workExperience;
    isMobile: boolean = true;
    @ViewChild(ParagraphComponent) paragraphComponent!: ParagraphComponent;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder,
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.wExpGroup = this.cvFormGroup.get('workExperience') as FormArray;
        this.createWExp();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    getFormGroup(index: number): FormGroup {
        return this.wExpGroup.at(index || 0) as FormGroup;
    }

    createWExp(): FormGroup {
        return this.fb.group({
            /* position: [this.wExpDataInit.map((wExp: any) => wExp.position) || ''], */
            /* organization: [this.wExpDataInit.map((wExp: any) => wExp.organization) || ''], */
            /* location: [this.wExpDataInit.map((wExp: any) => wExp.location) || ''], */
            /* workingDay: [this.wExpDataInit.map((wExp: any) => wExp.worKingDay) || ''], */
            /* wExpInitMonth: [this.wExpDataInit.map((wExp: any) => wExp.wExpInitMonth) || ''], */
            /* wExpInitYear: [this.wExpDataInit.map((wExp: any) => wExp.wExpInitYear) || ''], */
            /* wExpEndMonth: [this.wExpDataInit.map((wExp: any) => wExp.wExpEndMonth) || ''], */
            /* wExpEndYear: [this.wExpDataInit.map((wExp: any) => wExp.wExpEndYear) || ''], */
            /* inCourse: [this.wExpDataInit.map((wExp: any) => wExp.inCourse) || ''], */
            /* description: [this.wExpDataInit.map((wExp: any) => wExp.description) || ''] */
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
        const index: number = this.wExpGroup.length;
        this.wExpGroup.push(this.createWExp());
        this.resetWExp(index);
    }

    removeWExp(index: number): void {
        this.wExpGroup.removeAt(index);
    }

    resetWExp(index: number): void {
        const wExpGroup = this.getFormGroup(index);
        wExpGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}