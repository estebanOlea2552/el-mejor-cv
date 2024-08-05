import { Injectable } from '@angular/core';
import { Template1Component } from '../components/templates/template1/template1.component';
import { Template2Component } from '../components/templates/template2/template2.component';
import { TemplateI } from '../interfaces/templateI';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  private templates: TemplateI[] = [
    { id: 'tempalte1', name: 'Template 1', component: Template1Component },
    { id: 'tempalte2', name: 'Template 2', component: Template2Component }
  ]

  public getTemplates(): TemplateI[] {
    return this.templates;
  }

  public getTemplateById(id: string):TemplateI | undefined {
    return this.templates.find(t => t.id === id);
  }
}
