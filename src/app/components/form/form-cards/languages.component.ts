import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { LevelComponent } from "src/app/components/form/form-shared-components/level/level.component";
import { TextLineComponent } from "src/app/components/form/form-shared-components/text-line/text-line.component";
import { FormService } from "src/app/shared/services/form.service";

@Component({
    selector: 'languages',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <mat-icon class="title-icon">translate</mat-icon>
                <h2>Idiomas</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="languages">
                <mat-card
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let lang of langGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="language"
                        label="Idioma">
                        </text-line>
                    </div>
                    <div class="input">
                        <level
                        [groupName]="getFormGroup(i)"
                        controlName="level"
                        label="Nivel"
                        [isLangLevel]="true">
                        </level>
                    </div>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeLang(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetLang(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button class="add-button" mat-flat-button (click)="addLang()">
                    <mat-icon>add</mat-icon>
                    Añadir idioma
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('skills')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-raised-button class="next" (click)="changeSelectedCard('ref')">
                    <mat-icon>chevron_right</mat-icon>
                    Siguiente
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
    `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        TextLineComponent,
        LevelComponent,
        MatButtonModule
    ],
})
export class LanguagesComponent {
    cvFormGroup!: FormGroup;
    langGroup!: FormArray;
    langDataInit: any = cvDataInit.languages;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder, 
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.langGroup = this.cvFormGroup.get('languages') as FormArray;
        this.createLang();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    getFormGroup(index: number): FormGroup {
        return this.langGroup.at(index || 0) as FormGroup;
    }

    createLang(): FormGroup {
        return this.fb.group({
            /* language: [this.langDataInit.map((lang: any) => lang.language) || ''], */
            /* level: [this.langDataInit.map((lang: any) => lang.level) || ''] */
            language: [''],
            level: ['']
        });
    }

    addLang(): void {
        const index = this.langGroup.length;
        this.langGroup.push(this.createLang());
        this.resetLang(index);
    }

    removeLang(index: number): void {
        this.langGroup.removeAt(index);
    }

    resetLang(index: number): void {
        const langGroup = this.getFormGroup(index);
        langGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}