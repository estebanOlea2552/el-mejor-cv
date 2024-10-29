import { Routes } from "@angular/router";
import { SkillsComponent } from "./components/form/form-cards/skills.component";
import { CvEditorComponent } from "./modules/cv-editor/cv-editor.component";
import { PersonalInfoComponent } from "./components/form/form-cards/personal-info.component";
import { EducationComponent } from "./components/form/form-cards/education.component";
import { WorkExperienceComponent } from "./components/form/form-cards/work-experience.component";
import { CertificationsComponent } from "./components/form/form-cards/certifications.component";
import { LanguagesComponent } from "./components/form/form-cards/languages.component";
import { VolunteerWorksComponent } from "./components/form/form-cards/volunteer-works.component";
import { ReferencesComponent } from "./components/form/form-cards/references.component";
import { LinksComponent } from "./components/form/form-cards/links.component";
import { HomePageComponent } from "./modules/home-page/home-page.component";
import { TemplateManangerComponent } from "./modules/template-mananger/template-mananger.component";

export const APP_ROUTES: Routes = [
    { path: '',
        component: HomePageComponent
    },
    { path: 'template-mananger',
        component: TemplateManangerComponent
    },
    { path: 'editor',
        component: CvEditorComponent,
        children: [
            {path: 'p-info', component: PersonalInfoComponent},
            {path: 'ed', component: EducationComponent},
            {path: 'work-exp', component: WorkExperienceComponent},
            {path: 'cert', component: CertificationsComponent},
            {path: 'skills', component: SkillsComponent},
            {path: 'lang', component: LanguagesComponent},
            {path: 'vol-works', component: VolunteerWorksComponent},
            {path: 'ref', component: ReferencesComponent},
            {path: 'links', component: LinksComponent}
        ]
    }
]