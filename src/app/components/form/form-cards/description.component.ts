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
                <button mat-flat-button class="prev" (click)="changeSelectedCard('pinfo')">
                    <mat-icon>chevron_left</mat-icon>
                    <span>Anterior</span>
                </button>
                <button mat-flat-button class="next" (click)="changeSelectedCard('ed')">
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
                width: 100%;
                margin-top: 5%;
                margin-bottom: 5%;
            }
            h2 {
                margin-left: 5%;
                margin-top: 2%;
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
                width: 70%;
                margin: 1%;
                transform: scale(0.9);
            }
            .prev-next-container-mobile {
                width: 80%;
            }
            .prev-next-container-desktop {
                width: 50%;
            }
            .prev-next-container {
                box-sizing: border-box;
                /* position: absolute;
                bottom: 1%; */
                display: flex;
                margin-top: 3%;
                justify-content: space-between;
                border: 1px solid black
            }
            /* .prev {
                margin-left: 3%;
            }
            .next {
                margin-right: 3%;
            }
            .next mat-icon {
                order: 2;
                margin-left: 8px;
            }
            .next span {
                order: 1;
            } */
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