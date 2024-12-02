import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
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
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let control of linksGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="link"
                        label="Enlace">
                        </text-line>
                    </div>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeLinks(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetLinks(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campo
                        </button>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button mat-flat-button (click)="addLinks()">
                    <mat-icon>add</mat-icon>
                    Añadir link
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
                border: 2px solid grey;
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
                border: 2px solid grey;
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
                grid-column: 1 / 3;
                width: 100%;
                /* border: 2px solid grey; */
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
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        TextLineComponent,
        MatButtonModule
    ],
    animations: [ slideInOutAnimation ]
})
export class LinksComponent {
    cvFormGroup!: FormGroup;
    linksGroup!: FormArray;
    linksDataInit: any = cvDataInit.links;
    isMobile: boolean = true;

    constructor(
        private fb: FormBuilder,
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.linksGroup = this.cvFormGroup.get('links') as FormArray;
        this.createLinks();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
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

    resetLinks(index: number): void {
        const linksGroup = this.getFormGroup(index);
        linksGroup.reset();
    }
}