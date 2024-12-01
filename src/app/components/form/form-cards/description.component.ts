import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { FormService } from "src/app/services/form.service";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";

@Component({
    selector: 'description',
    template: `
        <div class="container">
            <div class="header">
                <h2>Resúmen Profesional</h2>
            </div>
            <div class="input-container">              
                <paragraph
                [groupName]="descGroup"
                controlName="description">
                </paragraph>       
            </div>
        </div>
    `,
    styles: [`
            .container {
                /* background-color: aquamarine; */
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
                border: 2px solid black;
                width: 100%;
                padding: 3%;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ParagraphComponent
    ],
})
export class DescriptionComponent {
    cvFormGroup!: FormGroup;
    descGroup!: FormGroup;

    constructor(private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.descGroup = this.cvFormGroup.get('description') as FormGroup;
    }
}