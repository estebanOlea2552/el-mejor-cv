import { Injectable } from '@angular/core';

import { Template1Component } from '../modules/cv-editor/templates/template1/template1.component';
import { Template2Component } from '../modules/cv-editor/templates/template2/template2.component';
import { TemplateI } from '../interfaces/templateI';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  private templates: TemplateI[] = [
    { id: 'template1', name: 'Template 1', component: Template1Component },
    { id: 'template2', name: 'Template 2', component: Template2Component }
  ]

  public getTemplates(): TemplateI[] {
    return this.templates;
  }

  public getTemplateById(id: string):TemplateI | undefined {
    return this.templates.find(t => t.id === id);
  }
}
