import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditorComponent } from './cv-editor.component';

import { FormComponent } from 'src/app/components/form/form.component'; 
import { PreviewComponent } from 'src/app/components/preview/preview.component'; 
import { CvEditorRoutingModule } from './cv-editor-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormRoutingModule } from 'src/app/components/form/form-routing.module';


@NgModule({
  declarations: [
    CvEditorComponent
  ],
  imports: [
    CommonModule,
    CvEditorRoutingModule,
    FormComponent,
    FormRoutingModule,
    PreviewComponent,
    FlexLayoutModule,
  ]
})
export class CvEditorModule { }