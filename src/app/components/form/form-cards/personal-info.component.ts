import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { FormService } from "src/app/services/form.service";

import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'personal-info',
    template: `
        <div class="container">
            <div class="header">
                <h2>Información Personal</h2>
            </div>
            <div class="input-container" [ngClass]="{'input-container-desktop': !isMobile}">
                <div class="input">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="name"
                        label="Nombre">
                    </text-line>
                </div>
                <div class="input">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="lastname"
                        label="Apellido">
                    </text-line>
                </div>
                <div class="input">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="jobPosition"
                        label="Puesto">
                    </text-line>
                </div>
                <div class="input">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="email"
                        label="Email">
                    </text-line>
                </div>
                <div class="input">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="phone"
                        label="Teléfono">
                    </text-line>
                </div>
                <div class="input">
                    <div class="photo-place">
                        Foto
                    </div>
                </div>
                <div class="accordion-container">
                    <mat-accordion class="accordion">
                        <mat-expansion-panel >
                            <mat-expansion-panel-header>
                                Agregar más información
                            </mat-expansion-panel-header>
                            <div class="accordion-content" [ngClass]="{'accordion-content-desktop': !isMobile}">
                                <div class="input">
                                    <text-line
                                    [groupName]="personalInfoGroup"
                                    controlName="country"
                                    label="País">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <text-line
                                    [groupName]="personalInfoGroup"
                                    controlName="stateProvince"
                                    label="Estado/Provincia">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <text-line
                                    [groupName]="personalInfoGroup"
                                    controlName="city"
                                    label="Ciudad">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <text-line
                                    [groupName]="personalInfoGroup"
                                    controlName="nationality"
                                    label="Nacionalidad">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <num-input
                                    [groupName]="personalInfoGroup"
                                    controlName="age"
                                    label="Edad">
                                    </num-input>
                                </div>
                            </div>
                        </mat-expansion-panel>
                    </mat-accordion>
                </div>
                <div class="card-button-container">      
                    <button mat-flat-button (click)="resetPInfo()" class="card-button">
                        <mat-icon>undo</mat-icon>
                        Reiniciar campos
                    </button>
                </div>
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
                border: 2px solid grey;
                width: 100%;
                margin-top: 5%;
                margin-bottom: 5%;
            }
            h2 {
                margin-left: 5%;
                margin-top: 2%;
            }
            .input-container {
                box-sizing: border-box;
                border: 2px solid grey;
                width: 100%;
                padding: 3%;
                margin-bottom: 3%;
            }
            .input-container-desktop {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
            .input {
                width: 100%;
                /* border: 2px solid grey; */
                transform: scale(0.9);
            }
            .photo {
                box-sizing: border-box;
            }
            .photo-place {
                border: 2px solid grey;
                width: 50%;
                height: 100%;
                box-sizing: border-box;
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
            .card-button-container {
                grid-column: 1 / 3;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            .card-button-container > button {
                width: 70%;
                margin: 1%;
                transform: scale(0.9);
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        TextLineComponent,
        NumInputComponent,
        MatExpansionModule
    ],
})
export class PersonalInfoComponent implements OnInit {
    cvFormGroup!: FormGroup;
    personalInfoGroup!: FormGroup;
    isMobile: boolean = true;

    constructor(
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ){}

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.personalInfoGroup = this.cvFormGroup.get('personalInfo') as FormGroup;

        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    resetPInfo():void {
        this.personalInfoGroup.reset();
    }
}