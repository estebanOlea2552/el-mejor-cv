import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ParagraphComponent } from "src/app/components/form/form-shared-components/paragraph/paragraph.component";
import { FormService } from "src/app/shared/services/form.service";

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
                <div
                class="card-button-container"
                [ngClass]="{'card-button-container-mobile': isMobile, 'card-button-container-desktop': !isMobile}">
                    <button mat-flat-button (click)="resetDesc()" class="card-button">
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
    styleUrls: ['form-cards_styles.css'],
    styles: [`
        .input-container {
            box-sizing: border-box;
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