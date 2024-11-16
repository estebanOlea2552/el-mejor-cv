import { Injectable } from '@angular/core';

import { Template } from '../model/template.model';
import { Template1Component } from '../components/templates/template1/template1.component'; 
import { Template2Component } from '../components/templates/template2/template2.component'; 
import { Template3Component } from '../components/templates/template3/template3.component';
import { Template4Component } from '../components/templates/template4/template4.component';
import { Template5Component } from '../components/templates/template5/template5.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  private templates: Template[] = [
    { id: 'template1', templateName: 'Template 1', component: Template1Component },
    { id: 'template2', templateName: 'Template 2', component: Template2Component },
    { id: 'template3', templateName: 'Template 3', component: Template3Component },
    { id: 'template4', templateName: 'Template 4', component: Template4Component },
    { id: 'template5', templateName: 'Template 5', component: Template5Component }
  ]

  public getTemplates(): Template[] {
    return this.templates;
  }

  public getTemplateById(id: string):Template | undefined {
    return this.templates.find(template => template.id === id);
  }
}
