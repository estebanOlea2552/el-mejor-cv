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
    selector: 'languages',
    template: `
    <mat-card class="form-card">
    <mat-card-header>
        <mat-card-title>
            Idiomas
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <div [formGroup]="cvFormGroup">
        <div formArrayName="languages">
            <div *ngFor="let control of langGroup.controls, let i=index" [formGroupName]="i">
                <text-line [groupName]="getFormGroup(i)" controlName="language"
                    label="Idioma">
                </text-line>
                <level [groupName]="getFormGroup(i)" controlName="level" label="Nivel">
                </level>
                <button mat-button (click)="removeLang(i)">
                    remove
                </button>
            </div>
            <button mat-button (click)="addLang()">
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
    ],
})
export class LanguagesComponent {
    cvFormGroup!: FormGroup;
    langGroup!: FormArray;
    langDataInit: any = cvDataInit.languages;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.langGroup = this.cvFormGroup.get('languages') as FormArray;
        this.createLang();
    }

    getFormGroup(index: number): FormGroup {
        return this.langGroup.at(index || 0) as FormGroup;
    }

    createLang(): FormGroup {
        return this.fb.group({
            language: [this.langDataInit.map((lang: any) => lang.language) || ''],
            level: [this.langDataInit.map((lang: any) => lang.level) || '']
        });
    }

    addLang(): void {
        this.langGroup.push(this.createLang());
    }

    removeLang(index: number): void {
        this.langGroup.removeAt(index);
    }
}