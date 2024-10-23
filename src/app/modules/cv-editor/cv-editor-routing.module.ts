import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvEditorComponent } from './cv-editor.component';

const routes: Routes = [
  { path: '', component: CvEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvEditorRoutingModule { }