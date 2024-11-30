import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'links',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <div class="header">
                <h2>Referencias</h2>
            </div>
            <div class="input-group-container" formArrayName="links">
                <div
                class="input-list-container"
                *ngFor="let control of linksGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="link"
                        label="Enlace">
                        </text-line>
                    </div>
                </div>
            </div>
        </div>
        <!-- <mat-card class="form-card">
            <mat-card-header class="form-card-header">
                <mat-card-title>
                    Enlaces
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="form-card-content">
                <div [formGroup]="cvFormGroup">
                <div formArrayName="links">
                    <div *ngFor="let control of linksGroup.controls, let i=index" [formGroupName]="i">
                        <text-line [groupName]="getFormGroup(i)" controlName="link" label="Enlace">
                        </text-line>
                        <button mat-button (click)="removeLinks(i)">
                            remove
                        </button>
                    </div>
                    <button mat-button (click)="addLinks()">
                        add
                    </button>
                </div>
                </div>
            </mat-card-content>
        </mat-card> -->
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
            .input-group-container {
                /* background-color: green; */
                width: 100%;
                box-sizing: border-box;
            }
            .input-list-container {
                border: 2px solid black;
                width: 100%;
                height: auto;
                box-sizing: border-box;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 3%;
                margin-bottom: 3%;
            }
            .input {
                width: 100%;
                border: 2px solid grey;
                transform: scale(0.9);
                box-sizing: border-box;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        MatButtonModule
    ],
    animations: [ slideInOutAnimation ]
})
export class LinksComponent {
    cvFormGroup!: FormGroup;
    linksGroup!: FormArray;
    linksDataInit: any = cvDataInit.links;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.linksGroup = this.cvFormGroup.get('links') as FormArray;
        this.createLinks();
    }

    getFormGroup(index: number): FormGroup {
        return this.linksGroup.at(index || 0) as FormGroup;
    }

    createLinks(): FormGroup {
        return this.fb.group({
            link: [this.linksDataInit.map((link: any) => link.link) || '']
        });
    }

    addLinks(): void {
        this.linksGroup.push(this.createLinks());
    }

    removeLinks(index: number): void {
        this.linksGroup.removeAt(index);
    }
}