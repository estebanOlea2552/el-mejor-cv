import { Injectable } from '@angular/core';

import { Template } from '../model/template.model';
import { Template1Component } from '../components/templates/template1/template1.component'; 
import { Template2Component } from '../components/templates/template2/template2.component'; 
import { Template3Component } from '../components/templates/template3/template3.component';
import { Template4Component } from '../components/templates/template4/template4.component';
import { Template5Component } from '../components/templates/template5/template5.component';
import { DefaultPreviewScreenComponent } from '../components/templates/default-preview-screen/default-preview-screen.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  
  private defaultScreen: Template = { id: 't00', templateName: 'default', component: DefaultPreviewScreenComponent };
  
  private templates: Template[] = [
    { id: 't01', templateName: 'Clean', component: Template1Component },
    { id: 't02', templateName: 'Minimalist', component: Template2Component },
    { id: 't03', templateName: 'Classic', component: Template3Component },
    { id: 't04', templateName: 'Modern', component: Template4Component },
    { id: 't05', templateName: 'Creative', component: Template5Component }
  ]

  public getTemplates(): Template[] {
    return this.templates;
  }

  public getTemplateById(id: string):Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  public getDefaultScreen(): Template {
    return this.defaultScreen;
  }
}
