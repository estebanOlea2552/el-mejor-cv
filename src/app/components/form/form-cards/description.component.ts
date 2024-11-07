import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { FormService } from "src/app/services/form.service";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";

@Component({
    selector: 'description',
    template: `
        <mat-card class="form-card">
            <mat-card-header>
                <mat-card-title>
                    Resúmen Profesional
                </mat-card-title>
                <mat-card-subtitle (click)="toggleVisible()">
                    Añadir resúmen
                </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content *ngIf="isVisible" @slideInOut>
                <paragraph [groupName]="descGroup" controlName="description">
                </paragraph>
            </mat-card-content>
        </mat-card>
    `,
    styles: [``],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ParagraphComponent
    ],
    animations: [ slideInOutAnimation ]
})
export class DescriptionComponent {
    cvFormGroup!: FormGroup;
    descGroup!: FormGroup;
    isVisible: boolean = false;

    constructor(private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.descGroup = this.cvFormGroup.get('description') as FormGroup;
    }

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }
}