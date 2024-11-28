import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
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
            <div class="input-container input-cont-desktop">
                <div class="input name">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="name"
                        label="Nombre"
                        class="">
                    </text-line>
                </div>
                <div class="input lastname">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="lastname"
                        label="Apellido"
                        class="">
                    </text-line>
                </div>
                <div class="input job-position">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="jobPosition"
                        label="Puesto"
                        class="">
                    </text-line>
                </div>
                <div class="input email">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="email"
                        label="Email"
                        class="">
                    </text-line>
                </div>
                <div class="input phone">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="phone"
                        label="Teléfono"
                        class="">
                    </text-line>
                </div>
            </div>
            <mat-accordion class="accordion acc-desktop">
                <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            Agregar más información
                        </mat-expansion-panel-header>
                        <text-line
                        [groupName]="personalInfoGroup"
                        controlName="country"
                        label="País"
                        class="">
                        </text-line>
                        <text-line
                        [groupName]="personalInfoGroup"
                        controlName="stateProvince"
                        label="Estado/Provincia"
                        class="">
                        </text-line>
                        <text-line
                        [groupName]="personalInfoGroup"
                        controlName="city"
                        label="Ciudad"
                        class="">
                        </text-line>
                        <text-line
                        [groupName]="personalInfoGroup"
                        controlName="nationality"
                        label="Nacionalidad"
                        class="">
                        </text-line>
                        <num-input
                        [groupName]="personalInfoGroup"
                        controlName="age"
                        label="Edad"
                        class="">
                        </num-input>
                </mat-expansion-panel>
            </mat-accordion>
        </div>
    `,
    styles: [`
            mat-card, mat-card-header, mat-card-content {
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                height: 100%;
                /* background-color: aquamarine; */
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                margin: 0;
                padding-top: 12%;
                overflow-y: scroll;
            }
            .header {
                /* background-color: hotpink; */
                width: 80%;
                display: flex;
                justify-content: start;
                align-items: center
            }
            h2 {
                margin-left: 5%;
                margin-top: 2%;
            }
            .input-cont-desktop {
                width: 80%;
                
                margin: 2%;
            }
            .input-cont-mobile {
                width: 100%;
            }
            .input-container {
                height: 50%;
                min-height: 50%;
                /* background-color: hotpink; */
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-items: center;
                align-items: center;
                padding: 0;
            }
            .input {
                width: 100%;
                /* transform: scale(0.9); */
                /* background-color: purple; */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .input-mobile {
                transform: scale(0.9); 
            }
            .acc-desktop {
                width: 80%;
                margin: 2%;
            }
            .acc-mobile {
                width: 100%;
            }
            .accordion {
                display: block;
                box-sizing: border-box;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        NumInputComponent,
        MatExpansionModule
    ],
})
export class PersonalInfoComponent implements OnInit {
    cvFormGroup!: FormGroup;
    personalInfoGroup!: FormGroup;

    constructor(private form: FormService){}

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.personalInfoGroup = this.cvFormGroup.get('personalInfo') as FormGroup;
    }
}