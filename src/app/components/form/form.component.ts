import { Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

// Internal App imports
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { PersonalInfoComponent } from './form-cards/personal-info.component';
import { DescriptionComponent } from './form-cards/description.component';
import { EducationComponent } from './form-cards/education.component';
import { WorkExperienceComponent } from './form-cards/work-experience.component';
import { CertificationsComponent } from './form-cards/certifications.component';
import { SkillsComponent } from './form-cards/skills.component';
import { LanguagesComponent } from './form-cards/languages.component';
import { ReferencesComponent } from './form-cards/references.component';
import { LinksComponent } from './form-cards/links.component';
import { PreviewConnectorService } from 'src/app/shared/services/preview-connector.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormComponent implements OnInit, OnChanges {
  // Element where the Form Items are rendered
  @ViewChild('dynamicView', { read: ViewContainerRef, static: true })
  dynamicView!: ViewContainerRef;

  @Input() selectedCard: string = "";

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
        references: this.formBuilder.array(
          this.cvDataInput.references.map(ref => this.createReference(ref))
        ),
        links: this.formBuilder.array(
          this.cvDataInput.links.map(link => this.createLink(link))
        )
      }
    );
  }

  ngOnInit(): void {
    this.initFormListeners();

    // Send the cvFormGroup data to children components
    this.formService.setFormGroup(this.cvFormGroup);
    this.cardHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedCard']){
      this.cardHandler();
    }
  }

  // Switch for any possible card
  private cardHandler(): void {
    switch (this.selectedCard) {
      case 'pinfo':
        this.renderComponent(PersonalInfoComponent);
        break
      case 'desc':
        this.renderComponent(DescriptionComponent);
        break
      case 'ed':
        this.renderComponent(EducationComponent);
        break
      case 'workexp':
        this.renderComponent(WorkExperienceComponent);
        break
      case 'cert':
        this.renderComponent(CertificationsComponent);
        break
      case 'skills':
        this.renderComponent(SkillsComponent);
        break
      case 'lang':
        this.renderComponent(LanguagesComponent);
        break
      case 'ref':
        this.renderComponent(ReferencesComponent);
        break
      case 'links':
        this.renderComponent(LinksComponent);
        break
      default:
        this.renderComponent(PersonalInfoComponent);
        break;
    }
  }

  // Dynamic render of components
  private renderComponent(component: Type<any>) {
    this.dynamicView.clear();
    const renderedCard = this.dynamicView.createComponent(component);
    
    /* When the next or prev button is activated in a child component, 
    the event is received here and the selected card is navigated to. */
    renderedCard.instance.selectedCard?.subscribe((selectedCard: string) => {
      this.selectedCard = selectedCard;
      this.cardHandler();
    })
  }

  // PersonalInfo
  private createPersonalInfo(): FormGroup {
    return this.formBuilder.group({
      name: [this.cvDataInput.personalInfo.name, [Validators.maxLength(50), Validators.pattern('^[^0-9]+$')]],
      lastname: [this.cvDataInput.personalInfo.lastname, [Validators.maxLength(50), Validators.pattern('^[^0-9]+$')]],
      jobPosition: [this.cvDataInput.personalInfo.jobPosition, Validators.maxLength(50)],
      email: [this.cvDataInput.personalInfo.email, Validators.email],
      picture: [this.cvDataInput.personalInfo.picture],
      phone: [this.cvDataInput.personalInfo.phone, [Validators.maxLength(15), Validators.pattern('^[^a-zA-Z]*$')]],
      country: [this.cvDataInput.personalInfo.country],
      stateProvince: [this.cvDataInput.personalInfo.stateProvince],
      city: [this.cvDataInput.personalInfo.city],
      age: [this.cvDataInput.personalInfo.age, Validators.maxLength(2)],
    });
  }

  // Description
  private createDescription(): FormGroup {
    return this.formBuilder.group({
      description: [this.cvDataInput.description.description, Validators.maxLength(1000)]
    })
  }

  // Education FormArray
  private createEducation(edu: any = {}): FormGroup {
    return this.formBuilder.group({
      grade: [edu.grade || '', Validators.maxLength(150)],
      school: [edu.school || '', Validators.maxLength(150)],
      type: [edu.type || '', Validators.maxLength(150)],
      average: [edu.average || '', Validators.maxLength(3)],
      edInitMonth: [edu.edInitMonth || ''],
      edInitYear: [edu.edInitYear || ''],
      edEndMonth: [edu.edEndMonth || ''],
      edEndYear: [edu.edEndYear || ''],
      inCourse: [edu.inCourse || ''],
      description: [edu.description || '', Validators.maxLength(1000)]
    });
  }

  // Work Experience FormArray
  private createWorkExp(wExp: any = {}): FormGroup {
    return this.formBuilder.group({
      position: [wExp.position || '', Validators.maxLength(150)],
      organization: [wExp.organization || '', Validators.maxLength(150)],
      location: [wExp.location || ''],
      workingDay: [wExp.workingDay || '', Validators.maxLength(50)],
      wExpInitMonth: [wExp.wExpInitMonth || ''],
      wExpInitYear: [wExp.wExpInitYear || ''],
      wExpEndMonth: [wExp.wExpEndMonth || ''],
      wExpEndYear: [wExp.wExpEndYear || ''],
      inCourse: [wExp.inCourse || ''],
      description: [wExp.description || '', Validators.maxLength(1000)]
    });
  }

  // Certifications FormArray
  private createCertification(cert: any = {}): FormGroup {
    return this.formBuilder.group({
      title: [cert.title || '', Validators.maxLength(150)],
      institution: [cert.institution || '', Validators.maxLength(150)],
    });
  }

  // Skills FormArray
  private createSkill(skill: any = {}): FormGroup {
    return this.formBuilder.group({
      skill: [skill.skill || '', Validators.maxLength(150)],
      level: [skill.level || '']
    });
  }

  // Languages FormArray
  private createLanguage(lang: any = {}): FormGroup {
    return this.formBuilder.group({
      language: [lang.language || '', Validators.maxLength(50)],
      level: [lang.level || '']
    });
  }

  // References FormArray
  private createReference(ref: any = {}): FormGroup {
    return this.formBuilder.group({
      name: [ref.name || ''],
      organization: [ref.organization || '', Validators.maxLength(150)],
      email: [ref.email || '', Validators.email],
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
}