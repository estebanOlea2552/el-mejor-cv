import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modules/home-page/home.module').then(m => m.HomeModule) 
  },
  { path: 'template-mananger',
    loadChildren: () => import('./modules/template-mananger/template-mananger.module').then(m => m.TemplateManangerModule) 
  },
  { path: 'editor',
    loadChildren: () => import('./modules/cv-editor/cv-editor.module').then(m => m.CvEditorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }