import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { LevelComponent } from "src/app/shared/level/level.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'skills',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <h2>Habilidades</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="skills">
                <mat-card
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let skill of skillGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="skill"
                        label="Habilidad">
                        </text-line>
                    </div>
                    <div class="input">
                        <level
                        [groupName]="getFormGroup(i)"
                        controlName="level"
                        label="Nivel">
                        </level>
                    </div>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeSkill(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetSkill(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button mat-flat-button (click)="addSkill()">
                    <mat-icon>add</mat-icon>
                    Añadir habilidad
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-flat-button class="prev" (click)="changeSelectedCard('cert')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-flat-button class="next" (click)="changeSelectedCard('lang')">
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
        TextLineComponent,
        LevelComponent,
        MatButtonModule
    ]
})
export class SkillsComponent {
    cvFormGroup!: FormGroup;
    skillGroup!: FormArray;
    skillDataInit: any = cvDataInit.skills;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder, 
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.skillGroup = this.cvFormGroup.get('skills') as FormArray;
        this.createSkill();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    getFormGroup(index: number): FormGroup {
        return this.skillGroup.at(index || 0) as FormGroup;
    }

    createSkill(): FormGroup {
        return this.fb.group({
            /* skill: [this.skillDataInit.map((skill: any) => skill.skill) || ''], */
            /* level: [this.skillDataInit.map((skill: any) => skill.level) || ''] */
            skill: [''],
            level: ['']
          });
    }

    addSkill(): void {
        const index = this.skillGroup.length;
        this.skillGroup.push(this.createSkill());
        this.resetSkill(index);
    }

    removeSkill(index: number): void {
        this.skillGroup.removeAt(index);
    }

    resetSkill(index: number): void {
        const skillGroup = this.getFormGroup(index);
        skillGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}