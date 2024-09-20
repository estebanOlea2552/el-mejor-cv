import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditorComponent } from './cv-editor.component';

import { MatCardModule } from '@angular/material/card';
import { FormComponent } from 'src/app/components/form/form.component'; 
import { PreviewComponent } from 'src/app/components/preview/preview.component'; 
import { CvEditorRoutingModule } from './cv-editor-routing.module';

@NgModule({
  declarations: [
    CvEditorComponent
  ],
  imports: [
    CommonModule,
    CvEditorRoutingModule,
    FormComponent,
    PreviewComponent,
    MatCardModule
  ]
})
export class CvEditorModule { }