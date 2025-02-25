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
    selector: 'links',
    template: `
        <div class="container" [formGroup]="cvFormGroup">
            <mat-card class="header">
                <mat-icon class="title-icon">link</mat-icon>
                <h2>Links</h2>
            </mat-card>
            <div class="input-group-container" formArrayName="links">
                <mat-card
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
                </mat-card>
            </div>
            <div class="button-container">
                <button class="add-button" mat-flat-button (click)="addLinks()">
                    <mat-icon>add</mat-icon>
                    Añadir link
                </button>
            </div>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('ref')">
                    Anterior
                    <mat-icon>chevron_left</mat-icon>
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
            grid-column: 1 / 3;
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
export class LinksComponent {
    cvFormGroup!: FormGroup;
    linksGroup!: FormArray;
    linksDataInit: any = cvDataInit.links;
    isMobile: boolean = true;
    @Output() selectedCard = new EventEmitter<string>();

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
            /* link: [this.linksDataInit.map((link: any) => link.link) || ''] */
            link: ['']
        });
    }

    addLinks(): void {
        const index = this.linksGroup.length;
        this.linksGroup.push(this.createLinks());
        this.resetLinks(index);
    }

    removeLinks(index: number): void {
        this.linksGroup.removeAt(index);
    }

    resetLinks(index: number): void {
        const linksGroup = this.getFormGroup(index);
        linksGroup.reset();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}