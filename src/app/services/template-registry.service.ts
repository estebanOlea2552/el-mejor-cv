import { Injectable } from '@angular/core';

import { Template1Component } from '../components/templates/template1/template1.component'; 
import { Template2Component } from '../components/templates/template2/template2.component'; 
import { Template } from '../model/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  private templates: Template[] = [
    { id: 'template1', templateName: 'Template 1', component: Template1Component },
    { id: 'template2', templateName: 'Template 2', component: Template2Component }
  ]

  public getTemplates(): Template[] {
    return this.templates;
  }

  public getTemplateById(id: string):Template | undefined {
    return this.templates.find(template => template.id === id);
  }
}
