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
    selector: 'skills',
    template: `
    <mat-card class="form-card">
    <mat-card-header>
        <mat-card-title>
            Habilidades
        </mat-card-title>
        <mat-card-subtitle (click)="toggleVisible()">
            Añadir Habilidades
        </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content *ngIf="isVisible" @slideInOut>
        <div [formGroup]="cvFormGroup">
        <div formArrayName="skills">
            <div *ngFor="let skill of skillGroup.controls, let i=index" [formGroupName]="i">
                <text-line [groupName]="getFormGroup(i)" controlName="skill"
                label="Habilidad">
            </text-line>
            <level [groupName]="getFormGroup(i)" controlName="level" label="Nivel">
                </level>
                <button mat-button (click)="removeSkill(i)">
                    remove
                </button>
            </div>
            <button mat-button (click)="addSkill()">
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
export class SkillsComponent {
    cvFormGroup!: FormGroup;
    skillGroup!: FormArray;
    skillDataInit: any = cvDataInit.skills;
    isVisible: boolean = false;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.skillGroup = this.cvFormGroup.get('skills') as FormArray;
        this.createSkill();
    }

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

    getFormGroup(index: number): FormGroup {
        return this.skillGroup.at(index || 0) as FormGroup;
    }

    createSkill(): FormGroup {
        return this.fb.group({
            skill: [this.skillDataInit.map((skill: any) => skill.skill) || ''],
            level: [this.skillDataInit.map((skill: any) => skill.level) || '']
          });
    }

    addSkill(): void {
        this.skillGroup.push(this.createSkill());
    }

    removeSkill(index: number): void {
        this.skillGroup.removeAt(index);
    }
}