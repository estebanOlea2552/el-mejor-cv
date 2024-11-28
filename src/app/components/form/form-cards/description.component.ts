import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { FormService } from "src/app/services/form.service";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";

@Component({
    selector: 'description',
    template: `
        <mat-card class="form-card">
            <mat-card-header class="form-card-header">
                <mat-card-title>
                    Resúmen Profesional
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="form-card-content">
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
})
export class DescriptionComponent {
    cvFormGroup!: FormGroup;
    descGroup!: FormGroup;

    constructor(private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.descGroup = this.cvFormGroup.get('description') as FormGroup;
    }
}