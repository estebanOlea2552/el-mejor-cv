import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParagraphComponent } from '../shared/paragraph/paragraph.component';
import { PersonalInfoComponent } from './form/form-cards/personal-info.component';
import { DescriptionComponent } from './form/form-cards/description.component';
import { EducationComponent } from './form/form-cards/education.component';
import { WorkExperienceComponent } from './form/form-cards/work-experience.component';
import { CertificationsComponent } from './form/form-cards/certifications.component';
import { SkillsComponent } from './form/form-cards/skills.component';
import { LanguagesComponent } from './form/form-cards/languages.component';
import { VolunteerWorksComponent } from './form/form-cards/volunteer-works.component';
import { ReferencesComponent } from './form/form-cards/references.component';
import { LinksComponent } from './form/form-cards/links.component';

const routes: Routes = [
    { path: 'personal-info', component: PersonalInfoComponent },
    { path: 'description', component: DescriptionComponent },
    { path: 'work-experience', component: WorkExperienceComponent },
    { path: 'education', component: EducationComponent },
    { path: 'certifications', component: CertificationsComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'languages', component: LanguagesComponent },
    { path: 'volunteer-works', component: VolunteerWorksComponent },
    { path: 'references', component: ReferencesComponent },
    { path: 'links', component: LinksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
