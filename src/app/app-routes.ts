import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
    },
    { path: 'template-mananger',
      loadComponent: () => import('./pages/template-mananger/template-mananger.component').then(m => m.TemplateManangerComponent)
    },
    { path: 'editor',
        loadComponent: () => import('./pages/cv-editor/cv-editor.component').then(m => m.CvEditorComponent),
    }
]