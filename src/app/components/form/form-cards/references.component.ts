import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { InitEndDateComponent } from "src/app/shared/init-end-date/init-end-date.component";
import { LevelComponent } from "src/app/shared/level/level.component";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { ParagraphComponent } from "src/app/shared/paragraph/paragraph.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'references',
    template: `
    <mat-card class="form-card">
    <mat-card-header>
        <mat-card-title>
            Referencias
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible()">
            Añadir Experiencia Laboral
        </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content *ngIf="isVisible" @slideInOut>
        <div [formGroup]="cvFormGroup">
        <div formArrayName="references">
            <div *ngFor="let control of refGroup.controls, let i=index" [formGroupName]="i">
                <text-line [groupName]="getFormGroup(i)" controlName="name"
                    label="Nombre Completo">
                </text-line>
                <text-line [groupName]="getFormGroup(i)" controlName="organization"
                    label="Organización">
                </text-line>
                <text-line [groupName]="getFormGroup(i)" controlName="email"
                    label="Email">
                </text-line>
                <text-line [groupName]="getFormGroup(i)" controlName="phone"
                    label="Teléfono">
                </text-line>
                <button mat-button (click)="removeRef(i)">
                    remove
                </button>
            </div>
            <button mat-button (click)="addRef()">
                add
            </button>
        </div>
        </div>
    </mat-card-content>
</mat-card>`,
    styles: [``],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ParagraphComponent,
        InitEndDateComponent,
        NumInputComponent,
        TextLineComponent,
        LevelComponent,
        MatButtonModule
    ],
    animations: [ slideInOutAnimation ]
})
export class ReferencesComponent {
    cvFormGroup!: FormGroup;
    refGroup!: FormArray;
    refDataInit: any = cvDataInit.references;
    isVisible: boolean = false;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.refGroup = this.cvFormGroup.get('references') as FormArray;
        this.createRef();
    }

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

    getFormGroup(index: number): FormGroup {
        return this.refGroup.at(index || 0) as FormGroup;
    }

    createRef(): FormGroup {
        return this.fb.group({
            name: [this.refDataInit.map((ref: any) => ref.name) || ''],
            organization: [this.refDataInit.map((ref: any) => ref.organization) || ''],
            email: [this.refDataInit.map((ref: any) => ref.email) || ''],
            phone: [this.refDataInit.map((ref: any) => ref.phone) || '']
        });
    }

    addRef(): void {
        this.refGroup.push(this.createRef());
    }

    removeRef(index: number): void {
        this.refGroup.removeAt(index);
    }
}