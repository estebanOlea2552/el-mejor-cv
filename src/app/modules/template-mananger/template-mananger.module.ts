import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateManangerRoutingModule } from './template-mananger-routing.module';
import { TemplateManangerComponent } from './template-mananger.component';
import { TemplateSelectorComponent } from 'src/app/components/template-selector/template-selector.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [TemplateManangerComponent],
  imports: [
    CommonModule,
    TemplateManangerRoutingModule,
    TemplateSelectorComponent,
    MatButtonModule
  ]
})
export class TemplateManangerModule { }
