import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

// Internal App Files
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { distinctUntilChanged } from 'rxjs';
import { slideInOutAnimation } from 'src/app/animations/slide-in-out';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
],
animations: [ slideInOutAnimation ]
})
export class FormComponent implements OnInit {  
  // FormGroup Declaration
  protected cvFormGroup: FormGroup;

  // cvData Declaration and init
  private cvDataInput: cvData = cvDataInit;

  constructor(
    private formBuilder: FormBuilder,
    private previewConnector: PreviewConnectorService,
    private formService: FormService
  ) {
    // FormGroup construction
    this.cvFormGroup = this.formBuilder.group(
      {
        personalInfo: this.createPersonalInfo(),
        description: this.createDescription(),
        workExperience: this.formBuilder.array(
          this.cvDataInput.workExperience.map(wExp => this.createWorkExp(wExp))
        ),
        education: this.formBuilder.array(
          this.cvDataInput.education.map(edu => this.createEducation(edu))
        ),
        certifications: this.formBuilder.array(
          this.cvDataInput.certifications.map(cert => this.createCertification(cert))
        ),
        skills: this.formBuilder.array(
          this.cvDataInput.skills.map(skill => this.createSkill(skill))
        ),
        languages: this.formBuilder.array(
          this.cvDataInput.languages.map(lang => this.createLanguage(lang))
        ),
        volunteerWorks: this.formBuilder.array(
          this.cvDataInput.volunteerWorks.map(vWork => this.createVolunteerWork(vWork))
        ),
        references: this.formBuilder.array(
          this.cvDataInput.references.map(ref => this.createReference(ref))
        ),
        links: this.formBuilder.array(
          this.cvDataInput.links.map(link => this.createLink(link))
        )
      }
    );
  };

  ngOnInit(): void {
    this.initFormListeners();
    // Send the cvFormGroup data to children components
    this.formService.setFormGroup(this.cvFormGroup);
  }

  // PersonalInfo
  private createPersonalInfo(): FormGroup {
    return this.formBuilder.group({
      name: [this.cvDataInput.personalInfo.name],
      lastname: [this.cvDataInput.personalInfo.lastname],
      jobPosition: [this.cvDataInput.personalInfo.jobPosition],
      email: [this.cvDataInput.personalInfo.email],
      phone: [this.cvDataInput.personalInfo.phone],
      country: [this.cvDataInput.personalInfo.country],
      stateProvince: [this.cvDataInput.personalInfo.stateProvince],
      city: [this.cvDataInput.personalInfo.city],
      nationality: [this.cvDataInput.personalInfo.nationality],
      age: [this.cvDataInput.personalInfo.age],
      professionalSummary: [this.cvDataInput.personalInfo.professionalSummary]
    });
  }

  // Description
  private createDescription(): FormGroup {
    return this.formBuilder.group({
      description: [this.cvDataInput.description.description]
    })
  }

  // Education FormArray
  private createEducation(edu: any = {}): FormGroup {
    return this.formBuilder.group({
      grade: [edu.grade || ''],
      school: [edu.school || ''],
      type: [edu.type || ''],
      average: [edu.average || ''],
      edInitMonth: [edu.edInitMonth || ''],
      edInitYear: [edu.edInitYear || ''],
      edEndMonth: [edu.edEndMonth || ''],
      edEndYear: [edu.edEndYear || ''],
      inCourse: [edu.inCourse || ''],
      description: [edu.description || '']
    });
  }

  // Work Experience FormArray
  private createWorkExp(wExp: any = {}): FormGroup {
    return this.formBuilder.group({
      position: [wExp.position || ''],
      organization: [wExp.organization || ''],
      location: [wExp.location || ''],
      workingDay: [wExp.worKingDay || ''],
      wExpInitMonth: [wExp.wExpInitMonth || ''],
      wExpInitYear: [wExp.wExpInitYear || ''],
      wExpEndMonth: [wExp.wExpEndMonth || ''],
      wExpEndYear: [wExp.wExpEndYear || ''],
      inCourse: [wExp.inCourse || ''],
      description: [wExp.description || '']
    });
  }

  // Certifications FormArray
  private createCertification(cert: any = {}): FormGroup {
    return this.formBuilder.group({
      title: [cert.title || ''],
      institution: [cert.institution || ''],
      average: [cert.average || '']
    });
  }
  
  // Skills FormArray
  private createSkill(skill: any = {}): FormGroup {
    return this.formBuilder.group({
      skill: [skill.skill || ''],
      level: [skill.level || '']
    });
  }

  // Languages FormArray
  private createLanguage(lang: any = {}): FormGroup {
    return this.formBuilder.group({
      language: [lang.language || ''],
      level: [lang.level || '']
    });
  }

  // Volunteer Works FormArray
  private createVolunteerWork(vWork: any = {}): FormGroup {
    return this.formBuilder.group({
      position: [vWork.position || ''],
      organization: [vWork.organization || ''],
      vWInitMonth: [vWork.vWInitMonth || ''],
      vWInitYear: [vWork.vWInitYear || ''],
      vWEndMonth: [vWork.vWEndMonth || ''],
      vWEndYear: [vWork.vWEndYear || ''],
      inCourse: [vWork.inCourse || ''],
      description: [vWork.description || '']
    });
  }

  // References FormArray
  private createReference(ref: any = {}): FormGroup {
    return this.formBuilder.group({
      name: [ref.name || ''],
      organization: [ref.organization || ''],
      email: [ref.email || ''],
      phone: [ref.phone || '']
    });
  }

  // Links FormArray
  private createLink(link: any = {}): FormGroup {
    return this.formBuilder.group({
      link: [link.link || '']
    });
  }

  // Create subscriptions for each FormControl
  private initFormListeners() {
    Object.keys(this.cvFormGroup.controls).forEach(
      (controlName: string) => {
        const control = this.cvFormGroup.get(controlName);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(
            (subControlName: string) => {
              const subControl = control.get(subControlName);
              this.subscribeToTheControl(subControl, `${controlName}.${subControlName}`);
            }
          );
        } else {
          this.subscribeToTheControl(control, controlName);
        }
      }
    );
  }

  // Take a FormControl and create a subscription
  private subscribeToTheControl(control: any, controlName: string) {
    control.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.updateCvData(controlName, value);
    });
  }

  // Loads the input value to the cvDataInput object and sends it to the previewConnector
  private updateCvData(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.cvDataInput as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.cvDataInput as any)[keys[0]][keys[1]] = value;
    }
    this.previewConnector.updateCvData(controlName, value);
  }

  protected resetForm(){
    this.cvFormGroup.reset();
  }
}