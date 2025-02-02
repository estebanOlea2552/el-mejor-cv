import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormService } from "src/app/services/form.service";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";

@Component({
    selector: 'description',
    template: `
        <div class="container">
            <mat-card class="header">
                <mat-icon class="title-icon">description</mat-icon>
                <h2>Resúmen Profesional</h2>
            </mat-card>
            <mat-card class="input-container">              
                <paragraph
                [groupName]="descGroup"
                controlName="description">
                </paragraph>       
                <div class="card-button-container">
                    <button mat-flat-button (click)="resetDesc()">
                        <mat-icon>undo</mat-icon>
                        Reiniciar campo
                    </button>
                </div>
            </mat-card>
            <div
            class="prev-next-container"
            [ngClass]="{'prev-next-container-mobile': isMobile, 'prev-next-container-desktop': !isMobile}">
                <button mat-raised-button class="prev" (click)="changeSelectedCard('pinfo')">
                    <mat-icon>chevron_left</mat-icon>
                    <span>Anterior</span>
                </button>
                <button mat-raised-button class="next" (click)="changeSelectedCard('workexp')">
                    <mat-icon>chevron_right</mat-icon>
                    <span>Siguiente</span>
                </button>
            </div>
        </div>
    `,
    styles: [`
            .container {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                margin: 0;
                padding: 10%;
                width: 100%;
                height: 100vh; 
                overflow-x: hidden;
                overflow-y: auto;
            }
            .header {
                width: 100%;
                margin-top: 2rem;
                margin-bottom: 2rem;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background-color: var(--cornflower-blue);
            }
            .title-icon {
                color: var(--white);
            }
            h2 {
                font-weight: 600;
                color: var(--white);
                margin-left: 1rem;
                margin-top: 1rem;
            }
            .input-container {
                width: 100%;
                padding: 3%;
            }
            .card-button-container {
                grid-column: 1 / 3;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            .card-button-container > button {
                width: 50%;
                margin: 1rem;
                background-color: var(--white);
                transform: scale(0.9);
                color: var(--medium-grey);
            }
            .card-button-container > button:hover {
                color: var(--black);
            }
            .prev-next-container-mobile {
                width: 80%;
            }
            .prev-next-container-desktop {
                width: 50%;
            }
            .prev-next-container {
                box-sizing: border-box;
                display: flex;
                justify-content: space-around;
                margin-top: 4rem;
            }
            .prev {
                margin-left: 3%;
                background-color: var(--cornflower-blue);
                color: var(--white);
            }
            .next {
                margin: 0;
                padding-right: 5px;
                background-color: var(--cornflower-blue);
                color: var(--white);
            }
            .next mat-icon {
                order: 2;
                margin-left: 8px;
            }
            .next span {
                order: 1;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        ParagraphComponent
    ],
})
export class DescriptionComponent {
    cvFormGroup!: FormGroup;
    descGroup!: FormGroup;
    isMobile: boolean = true;
    @ViewChild(ParagraphComponent) paragraphComponent!: ParagraphComponent;
    @Output() selectedCard = new EventEmitter<string>();

    constructor(
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.descGroup = this.cvFormGroup.get('description') as FormGroup;

        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    resetDesc():void {
        this.paragraphComponent.resetParagraph();
    }

    changeSelectedCard(cardName: string) {
        this.selectedCard.emit(cardName);
    }
}