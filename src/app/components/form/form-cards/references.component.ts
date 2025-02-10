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
    selector: 'references',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <mat-icon class="title-icon">groups</mat-icon>
                <h2>Referencias</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="references">
                <mat-card
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let control of refGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="name"
                        label="Nombre Completo">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="organization"
                        label="Organización">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="email"
                        label="Email">
                        </text-line>
                    </div>
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="phone"
                        label="Teléfono">
                        </text-line>
                    </div>
                    <div
                    [ngClass]="{
                        'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile
                    }">
                        <button mat-flat-button (click)="removeRef(i)" class="card-button">
                            <mat-icon>close</mat-icon>
                            Eliminar
                        </button>
                        <button mat-flat-button (click)="resetRef(i)" class="card-button">
                            <mat-icon>undo</mat-icon>
                            Reiniciar campos
                        </button>
                    </div>
                </mat-card>
            </div>
            <div class="button-container">
                <button class="add-button" mat-flat-button (click)="addRef()">
                    <mat-icon>add</mat-icon>
                    Añadir referencia
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('lang')">
                    <mat-icon>chevron_left</mat-icon>
                    Anterior
                </button>
                <button mat-raised-button class="next" (click)="changeSelectedCard('links')">
                    Siguiente
                    <mat-icon>chevron_right</mat-icon>
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
        MatButtonModule
    ]
})
export class ReferencesComponent {
    cvFormGroup!: FormGroup;
    refGroup!: FormArray;
    refDataInit: any = cvDataInit.references;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder,
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.refGroup = this.cvFormGroup.get('references') as FormArray;
        this.createRef();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }
    
    getFormGroup(index: number): FormGroup {
        return this.refGroup.at(index || 0) as FormGroup;
    }

    createRef(): FormGroup {
        return this.fb.group({
            /* name: [this.refDataInit.map((ref: any) => ref.name) || ''], */
            /* organization: [this.refDataInit.map((ref: any) => ref.organization) || ''], */
            /* email: [this.refDataInit.map((ref: any) => ref.email) || ''], */
            /* phone: [this.refDataInit.map((ref: any) => ref.phone) || ''] */
            name: [''],
            organization: [''],
            email: [''],
            phone: ['']
        });
    }

    addRef(): void {
        const index = this.refGroup.length;
        this.refGroup.push(this.createRef());
        this.resetRef(index);
    }

    removeRef(index: number): void {
        this.refGroup.removeAt(index);
    }

    resetRef(index: number): void {
        const refGroup = this.getFormGroup(index);
        refGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}