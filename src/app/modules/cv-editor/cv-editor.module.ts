import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditorComponent } from './cv-editor.component';

import { FormComponent } from 'src/app/components/form/form.component'; 
import { PreviewComponent } from 'src/app/components/preview/preview.component'; 
import { CvEditorRoutingModule } from './cv-editor-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CvEditorComponent
  ],
  imports: [
    CommonModule,
    CvEditorRoutingModule,
    FormComponent,
    PreviewComponent,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CvEditorModule { }