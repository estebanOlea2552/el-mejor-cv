import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { NumInputComponent } from "src/app/shared/num-input/num-input.component";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'certifications',
    template: `
        <mat-card class="form-card">
            <mat-card-header class="form-card-header">
                <mat-card-title>
                    Exámenes y Certificaciones
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="form-card-content">
                <div [formGroup]="cvFormGroup">
                <div formArrayName="certifications">
                    <div *ngFor="let control of certGroup.controls, let i=index" [formGroupName]="i">
                        <text-line [groupName]="getFormGroup(i)" controlName="title"
                            label="Título">
                        </text-line>
                        <text-line [groupName]="getFormGroup(i)" controlName="institution"
                            label="Institución">
                        </text-line>
                        <num-input [groupName]="getFormGroup(i)" controlName="average"
                            label="Puntaje">
                        </num-input>
                        <button mat-button (click)="removeCert(i)">
                            remove
                        </button>
                    </div>
                    <button mat-button (click)="addCert()">
                        add
                    </button>
                </div>
            </div>
            </mat-card-content>
        </mat-card>
    `,
    styles: [``],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        NumInputComponent,
        TextLineComponent,
        MatButtonModule
    ],
})
export class CertificationsComponent {
    cvFormGroup!: FormGroup;
    certGroup!: FormArray;
    certDataInit: any = cvDataInit.certifications;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.certGroup = this.cvFormGroup.get('certifications') as FormArray;
        this.createCert();
    }

    getFormGroup(index: number): FormGroup {
        return this.certGroup.at(index || 0) as FormGroup;
    }

    createCert(): FormGroup {
        return this.fb.group({
            title: [this.certDataInit.map((cert: any) => cert.title) ||''],
            institution: [this.certDataInit.map((cert: any) => cert.institution) ||''],
            average: [this.certDataInit.map((cert: any) => cert.average) ||'']
        })
         
    }

    addCert(): void {
        this.certGroup.push(this.createCert());
    }

    removeCert(index: number): void {
        this.certGroup.removeAt(index);
    }
}   