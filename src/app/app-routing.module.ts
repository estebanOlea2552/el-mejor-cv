import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvEditorComponent } from './components/cv-editor/cv-editor.component';

const routes: Routes = [
  {
    path: "",
    component: CvEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
