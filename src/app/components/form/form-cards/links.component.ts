import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { slideInOutAnimation } from "src/app/animations/slide-in-out";
import { cvDataInit } from "src/app/model/cv-data-init";
import { FormService } from "src/app/services/form.service";
import { TextLineComponent } from "src/app/shared/text-line/text-line.component";

@Component({
    selector: 'links',
    template: `
        <mat-card class="form-card">
            <mat-card-header>
                <mat-card-title>
                    Enlaces
                </mat-card-title>
            </mat-card-header>
            <mat-card-content class="content">
                <div [formGroup]="cvFormGroup">
                <div formArrayName="links">
                    <div *ngFor="let control of linksGroup.controls, let i=index" [formGroupName]="i">
                        <text-line [groupName]="getFormGroup(i)" controlName="link" label="Enlace">
                        </text-line>
                        <button mat-button (click)="removeLinks(i)">
                            remove
                        </button>
                    </div>
                    <button mat-button (click)="addLinks()">
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
    ],
    animations: [ slideInOutAnimation ]
})
export class LinksComponent {
    cvFormGroup!: FormGroup;
    linksGroup!: FormArray;
    linksDataInit: any = cvDataInit.links;

    constructor(private fb: FormBuilder, private form: FormService) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.linksGroup = this.cvFormGroup.get('links') as FormArray;
        this.createLinks();
    }

    getFormGroup(index: number): FormGroup {
        return this.linksGroup.at(index || 0) as FormGroup;
    }

    createLinks(): FormGroup {
        return this.fb.group({
            link: [this.linksDataInit.map((link: any) => link.link) || '']
        });
    }

    addLinks(): void {
        this.linksGroup.push(this.createLinks());
    }

    removeLinks(index: number): void {
        this.linksGroup.removeAt(index);
    }
}