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
            <div class="input-container">
                <div class="input name">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="name"
                        label="Nombre">
                    </text-line>
                </div>
                <div class="input lastname">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="lastname"
                        label="Apellido">
                    </text-line>
                </div>
                <div class="input job-position">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="jobPosition"
                        label="Puesto">
                    </text-line>
                </div>
                <div class="input email">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="email"
                        label="Email">
                    </text-line>
                </div>
                <div class="input phone">
                    <text-line
                        [groupName]="personalInfoGroup"
                        controlName="phone"
                        label="Teléfono">
                    </text-line>
                </div>
                <div class="input photo">
                    <div class="photo-place">
                        Foto
                    </div>
                </div>
            </div>
            <div class="accordion-container">
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
            .input-container {
                box-sizing: border-box;
                border: 2px solid black;
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 3%;
                margin-bottom: 3%;
            }
            .input {
                width: 100%;
                border: 2px solid grey;
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
                box-sizing: border-box;
                border: 2px solid black;
                width: 100%;
                padding: 3%;
                margin-top: 3%;
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