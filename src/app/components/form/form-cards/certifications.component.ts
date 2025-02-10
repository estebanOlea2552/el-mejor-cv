import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { cvDataInit } from "src/app/model/cv-data-init";
import { TextLineComponent } from "src/app/components/form/form-shared-components/text-line/text-line.component";
import { FormService } from "src/app/shared/services/form.service";

@Component({
    selector: 'certifications',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <mat-icon class="title-icon">workspace_premium</mat-icon>
                <h2>Exámenes y Certificaciones</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="certifications">
                <mat-card
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let control of certGroup.controls, let i=index" [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="title"
                        label="Título">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="institution"
                        label="Institución">
                        </text-line>
                    </div>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeCert(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetCert(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button class="add-button" mat-flat-button (click)="addCert()">
                    <mat-icon>add</mat-icon>
                    Añadir certificación
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('ed')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-raised-button class="next" (click)="changeSelectedCard('skills')">
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
        
        .dynamic-title-container {
            width: 100%;
            background-color: red;
            grid-column: 1 / 3;
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
        MatButtonModule
    ],
})
export class CertificationsComponent {
    cvFormGroup!: FormGroup;
    certGroup!: FormArray;
    certDataInit: any = cvDataInit.certifications;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder,
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.certGroup = this.cvFormGroup.get('certifications') as FormArray;
        this.createCert();

        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
            .subscribe(result => {
                this.isMobile = result.matches;
            });
    }

    getFormGroup(index: number): FormGroup {
        return this.certGroup.at(index || 0) as FormGroup;
    }

    createCert(): FormGroup {
        return this.fb.group({
            /* title: [this.certDataInit.map((cert: any) => cert.title) || ''], */
            /* institution: [this.certDataInit.map((cert: any) => cert.institution) || ''], */
            /* average: [this.certDataInit.map((cert: any) => cert.average) || ''] */
            title: [''],
            institution: [''],
            average: ['']
        })
    }

    addCert(): void {
        const index = this.certGroup.length;
        this.certGroup.push(this.createCert());
        this.resetCert(index);
    }

    removeCert(index: number): void {
        this.certGroup.removeAt(index);
    }

    resetCert(index: number): void {
        const certGroup = this.getFormGroup(index);
        certGroup.reset();

    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}   