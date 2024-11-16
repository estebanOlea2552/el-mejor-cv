import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { LevelComponent } from "src/app/shared/level/level.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'skills',
    template: `
    <mat-card class="form-card">
    <mat-card-header>
        <mat-card-title>
            Habilidades
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
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
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        LevelComponent,
        MatButtonModule
    ]
})
export class SkillsComponent {
    cvFormGroup!: FormGroup;
    skillGroup!: FormArray;
    skillDataInit: any = cvDataInit.skills;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.skillGroup = this.cvFormGroup.get('skills') as FormArray;
        this.createSkill();
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