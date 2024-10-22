import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditorComponent } from './cv-editor.component';

import { FormComponent } from 'src/app/components/form/form.component'; 
import { PreviewComponent } from 'src/app/components/preview/preview.component'; 
import { CvEditorRoutingModule } from './cv-editor-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    CvEditorComponent
  ],
  imports: [
    CommonModule,
    CvEditorRoutingModule,
    FormComponent,
    PreviewComponent,
    FlexLayoutModule,
  ]
})
export class CvEditorModule { }