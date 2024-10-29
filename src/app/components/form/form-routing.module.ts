import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './form-cards/personal-info.component';
import { DescriptionComponent } from './form-cards/description.component';
import { WorkExperienceComponent } from './form-cards/work-experience.component';
import { EducationComponent } from './form-cards/education.component';
import { CertificationsComponent } from './form-cards/certifications.component';
import { SkillsComponent } from './form-cards/skills.component';
import { LanguagesComponent } from './form-cards/languages.component';
import { VolunteerWorksComponent } from './form-cards/volunteer-works.component';
import { ReferencesComponent } from './form-cards/references.component';
import { LinksComponent } from './form-cards/links.component';

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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }