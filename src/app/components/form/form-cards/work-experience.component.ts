import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { InitEndDateComponent } from "src/app/components/form/form-shared-components/init-end-date/init-end-date.component";
import { ParagraphComponent } from "src/app/components/form/form-shared-components/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/components/form/form-shared-components/text-line/text-line.component";
import { FormService } from "src/app/shared/services/form.service";

@Component({
    selector: 'work-exp',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <mat-icon class="title-icon">work</mat-icon>
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
                            <mat-expansion-panel-header class="accordion-header">
                                Agregar más información
                            </mat-expansion-panel-header>
                            <div class="accordion-content border" [ngClass]="{'accordion-content-desktop': !isMobile}">
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
                                <div class="paragraph-container border">
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
                <button class="add-button" mat-flat-button (click)="addWExp()">
                    <mat-icon>add</mat-icon>
                    Añadir experiencia laboral
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('desc')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-raised-button class="next" (click)="changeSelectedCard('ed')">
                    Siguiente
                    <mat-icon>chevron_right</mat-icon>
                </button>
            </div>
        </div>
    `,
    styleUrls: ['form-cards_styles.css'],
    styles: [`
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
        .paragraph-container {
            grid-column: 1 / 3;
            width: 100%;
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