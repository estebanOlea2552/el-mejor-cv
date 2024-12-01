import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
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
        <div class="container" [formGroup]="cvFormGroup">
            <div class="header">
                <h2>Habilidades</h2>
            </div>
            <div class="input-group-container" formArrayName="skills">
                <div
                class="input-list-container"
                [ngClass]="{'input-list-container-desktop': !isMobile}"
                *ngFor="let skill of skillGroup.controls, let i=index" [formGroupName]="i"
                [formGroupName]="i">
                    <div class="input">
                        <text-line
                        [groupName]="getFormGroup(i)"
                        controlName="skill"
                        label="Habilidad">
                        </text-line>
                    </div>
                    <div class="input">
                        <level
                        [groupName]="getFormGroup(i)"
                        controlName="level"
                        label="Nivel">
                        </level>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            box-sizing: border-box; /* evita que las cajas internas sean empujadas fuera del contenedor por el padding; */
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            margin: 0;
            padding: 10%;
            width: 100%;
            height: 100vh; /* Otorga una medida precisa para calcular la altura y manejar el overflow-y */
            overflow-x: hidden; /* Oculta un overflow-x existente que debería solucionar */
            overflow-y: auto;
        }
        .header {
            border: 2px solid black;
            width: 100%;
            margin-top: 5%;
            margin-bottom: 5%;
        }
        h2 {
            margin-left: 5%;
            margin-top: 2%;
        }
        .input-group-container {
            width: 100%;
            box-sizing: border-box;
        }
        .input-list-container {
            border: 2px solid black;
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 3%;
            margin-bottom: 3%;
        }
        .input-list-container-desktop {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        .input {
            width: 100%;
            border: 2px solid grey;
            transform: scale(0.9);
            box-sizing: border-box;
        }
    `],
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
    isMobile: boolean = true;

    constructor(
        private fb: FormBuilder, 
        private form: FormService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cvFormGroup = this.form.getFormGroup();
        this.skillGroup = this.cvFormGroup.get('skills') as FormArray;
        this.createSkill();
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .subscribe(result => {
            this.isMobile = result.matches;
        });
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