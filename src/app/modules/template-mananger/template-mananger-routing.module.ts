import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManangerComponent } from './template-mananger.component';

const routes: Routes = [
  {
    path: "", component: TemplateManangerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateManangerRoutingModule { }
