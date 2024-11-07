import { Routes } from "@angular/router";
import { SkillsComponent } from "./components/form/form-cards/skills.component";
import { PersonalInfoComponent } from "./components/form/form-cards/personal-info.component";
import { EducationComponent } from "./components/form/form-cards/education.component";
import { WorkExperienceComponent } from "./components/form/form-cards/work-experience.component";
import { CertificationsComponent } from "./components/form/form-cards/certifications.component";
import { LanguagesComponent } from "./components/form/form-cards/languages.component";
import { VolunteerWorksComponent } from "./components/form/form-cards/volunteer-works.component";
import { ReferencesComponent } from "./components/form/form-cards/references.component";
import { LinksComponent } from "./components/form/form-cards/links.component";
import { DescriptionComponent } from "./components/form/form-cards/description.component";

export const APP_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () => import('./modules/home-page/home-page.component').then(m => m.HomePageComponent)
    }
    ,
    { path: 'template-mananger',
      loadComponent: () => import('./modules/template-mananger/template-mananger.component').then(m => m.TemplateManangerComponent)
    },
    { path: 'editor',
        loadComponent: () => import('./modules/cv-editor/cv-editor.component').then(m => m.CvEditorComponent),
        children: [
            {path: '', redirectTo: 'pinfo', pathMatch: 'full'},
            {path: 'pinfo', component: PersonalInfoComponent},
            {path: 'desc', component: DescriptionComponent},
            {path: 'ed', component: EducationComponent},
            {path: 'workexp', component: WorkExperienceComponent},
            {path: 'cert', component: CertificationsComponent},
            {path: 'skills', component: SkillsComponent},
            {path: 'lang', component: LanguagesComponent},
            {path: 'volworks', component: VolunteerWorksComponent},
            {path: 'ref', component: ReferencesComponent},
            {path: 'links', component: LinksComponent},
        ]
    }
]