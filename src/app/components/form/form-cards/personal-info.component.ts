import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { NumInputComponent } from "src/app/components/form/form-shared-components/num-input/num-input.component";
import { TextLineComponent } from "src/app/components/form/form-shared-components/text-line/text-line.component";
import { FormService } from "src/app/shared/services/form.service";
import { ProfilePictureService } from "src/app/shared/services/profile-picture.service";
import { AppState } from "src/app/shared/state/app.state";
import { templateSelector } from "src/app/shared/state/selectors/selected-template.selectors";

@Component({
    selector: 'personal-info',
    template: `
        <div class="container">
            <mat-card class="header">
                <mat-icon class="title-icon">person</mat-icon>
                <h2>Información Personal</h2>
            </mat-card>
            <mat-card class="input-container" [ngClass]="{'input-container-desktop': !isMobile}">
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
                    <div
                    class="photo-place"
                    [formGroup]="personalInfoGroup">
                        <div class="photo_button-message-container">
                            <button
                            [disabled]="disableFileInput"
                            [ngClass]="{'photo-disabled': disableFileInput}"
                            class="photo" mat-flat-button
                            (click)="fileInput.click()">
                                <mat-icon>image</mat-icon>
                                Subir una foto
                            </button>
                            <span class="photo-message" *ngIf="disableFileInput">
                                Esta plantilla no soporta foto de perfil
                            </span>
                        </div>
                        <button
                        *ngIf="!disableFileInput"
                        mat-icon-button class="photo-clear"
                        (click)="clearFileSelected()">
                            <mat-icon>close</mat-icon>
                        </button>
                        <input
                        hidden
                        type="file"
                        #fileInput
                        (change)="onFileSelected($event)"
                        accept=".jpg, .jpeg, .png">
                    </div>
                </div>
                <div class="accordion-container">
                    <mat-accordion class="accordion">
                        <mat-expansion-panel>
                            <mat-expansion-panel-header class="accordion-header">
                                Agregar más información
                            </mat-expansion-panel-header>
                            <div class="accordion-content" [ngClass]="{'accordion-content-desktop': !isMobile}">
                                <div class="warn-message">
                                    <p>
                                        <strong>Recuerda:</strong>
                                        Los siguientes datos son personales y privados. En la mayoría de los casos, no deberías compartirlos en tu currículum a menos que tu empleador los solicite explícitamente.
                                    </p>
                                </div>
                                <div class="input">
                                    <text-line
                                        [groupName]="personalInfoGroup"
                                        controlName="phone"
                                        label="Teléfono">
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
                                    controlName="stateProvince"
                                    label="Estado/Provincia">
                                    </text-line>
                                </div>
                                <div class="input">
                                    <text-line
                                    [groupName]="personalInfoGroup"
                                    controlName="country"
                                    label="País">
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
                    <button mat-flat-button (click)="resetPInfo()">
                        <mat-icon>undo</mat-icon>
                        Reiniciar campos
                    </button>
                </div>
            </mat-card>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="next" (click)="changeSelectedCard('desc')">
                    Siguiente
                    <mat-icon>chevron_right</mat-icon>
                </button>
            </div>
        </div>
    `,
    styleUrls: ['form-cards_styles.css'],
    styles: [`
        .input-container {
            box-sizing: border-box;
            width: 100%;
            padding: 3%;
        }
        .input-container-desktop {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        .input {
            width: 100%;
            transform: scale(0.9);
        }
        .photo-place {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;                
            align-items: center;
        }
        .photo_button-message-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .photo {
            width: 100%;
            box-sizing: border-box;
            height: 4em;
            font-size: 1rem;
            color: var(--tea-green);
            background-color: var(--marian-blue);
        }
        .photo-disabled {
            opacity: .7;
        }
        .photo-clear {
            margin-left: 1rem;
            transform: scale(0.8);
            background-color: var(--white);
            color: var(--marian-blue);
        }
        .photo-message {
            font-size: .8rem;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 500;   
            padding: .5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            line-height: 1;
            margin: .5rem;
        }
        .warn-message {
            background-color: var(--tea-green);
            color: var(--phthalo-blue);
            width: 80%;
            padding: 3%;
            grid-column: 1 / 3;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 3%;
            border-radius: 5px;
            box-shadow: 2px 2px 5px -5px rgba(0, 0, 0, 0.5);
        }
    `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatExpansionModule,
        TextLineComponent,
        NumInputComponent,
        NgxMatFileInputModule
    ],
})
export class PersonalInfoComponent implements OnInit {
    cvFormGroup!: FormGroup;
    disableFileInput!: boolean;
    isMobileSubscription!: Subscription;
    templateSelectorSubscription!: Subscription;
    personalInfoGroup!: FormGroup;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private form: FormService,
        private breakpointObserver: BreakpointObserver,
        private pictureService: ProfilePictureService, // This service sould be replaced by NGRX
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.personalInfoGroup = this.cvFormGroup.get('personalInfo') as FormGroup;

        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
            .subscribe(result => {
                this.isMobile = result.matches;
            });

        // Get selected Template from the Store
        this.templateSelectorSubscription = this.store.select(templateSelector).subscribe((templateId: string) => {
            /* t01 and t02 are templates that do not support profile pictures */
            if(templateId === 't01' || templateId === 't02' || !templateId) {
                this.disableFileInput = true;
            } else {
                this.disableFileInput = false;
            }
        })
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.personalInfoGroup.get('picture')?.setValue(file);
            this.pictureService.updatePicture(file);
        }
    }

    clearFileSelected(): void {
        this.pictureService.clearPicture();
    }

    resetPInfo(): void {
        this.personalInfoGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}