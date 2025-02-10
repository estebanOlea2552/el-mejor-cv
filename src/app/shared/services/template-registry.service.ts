import { Injectable } from '@angular/core';
import { DefaultPreviewScreenComponent } from 'src/app/components/templates/default-preview-screen/default-preview-screen.component';
import { Template1Component } from 'src/app/components/templates/template1/template1.component';
import { Template2Component } from 'src/app/components/templates/template2/template2.component';
import { Template3Component } from 'src/app/components/templates/template3/template3.component';
import { Template4Component } from 'src/app/components/templates/template4/template4.component';
import { Template5Component } from 'src/app/components/templates/template5/template5.component';
import { Template } from 'src/app/model/template.model';



@Injectable({
  providedIn: 'root'
})
export class TemplateRegistryService {
  
  private defaultScreen: Template = { id: 't00', templateName: 'default', component: DefaultPreviewScreenComponent, miniaturesReg: [''] };
  
  private templates: Template[] = [
    { 
      id: 't01', 
      templateName: 'Clean', 
      component: Template1Component, 
      miniaturesReg: ['t01_a.svg']
    },
    { 
      id: 't02', 
      templateName: 'Minimalist', 
      component: Template2Component, 
      miniaturesReg: ['t02_a.svg', 't02_b.svg', 't02_c.svg', 't02_d.svg', 't02_e.svg']
    },
    { 
      id: 't03', 
      templateName: 'Classic', 
      component: Template3Component, 
      miniaturesReg: ['t03_a.svg', 't03_b.svg', 't03_c.svg', 't03_d.svg', 't03_e.svg']
    },
    { 
      id: 't04', 
      templateName: 'Modern', 
      component: Template4Component, 
      miniaturesReg: ['t04_a.svg', 't04_b.svg', 't04_c.svg', 't04_d.svg', 't04_e.svg']
    },
    { 
      id: 't05', 
      templateName: 'Creative', 
      component: Template5Component, 
      miniaturesReg: ['t05_a.svg', 't05_b.svg', 't05_c.svg', 't05_d.svg', 't05_e.svg']
    }
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
