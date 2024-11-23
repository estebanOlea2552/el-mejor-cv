import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'references',
    template: `
        <mat-card class="form-card">
            <mat-card-header>
                <mat-card-title>
                    Referencias
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="content">
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
        </mat-card>
    `,
    styles: [`
            .content {
                display: block;
                width: 100%;
                height: 120%;
                background-color: grey;
            }
        `],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        TextLineComponent,
        MatButtonModule
    ]
})
export class ReferencesComponent {
    cvFormGroup!: FormGroup;
    refGroup!: FormArray;
    refDataInit: any = cvDataInit.references;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.refGroup = this.cvFormGroup.get('references') as FormArray;
        this.createRef();
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