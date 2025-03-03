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
      templateName: 'Limpio', 
      component: Template1Component, 
      miniaturesReg: ['t01_a.webp']
    },
    { 
      id: 't02', 
      templateName: 'Minimalista', 
      component: Template2Component, 
      miniaturesReg: ['t02_a.webp', 't02_b.webp', 't02_c.webp', 't02_d.webp', 't02_e.webp']
    },
    { 
      id: 't03', 
      templateName: 'Clásico', 
      component: Template3Component, 
      miniaturesReg: ['t03_a.webp', 't03_b.webp', 't03_c.webp', 't03_d.webp', 't03_e.webp']
    },
    { 
      id: 't04', 
      templateName: 'Moderno', 
      component: Template4Component, 
      miniaturesReg: ['t04_a.webp', 't04_b.webp', 't04_c.webp', 't04_d.webp', 't04_e.webp']
    },
    { 
      id: 't05', 
      templateName: 'Creativo', 
      component: Template5Component, 
      miniaturesReg: ['t05_a.webp', 't05_b.webp', 't05_c.webp', 't05_d.webp', 't05_e.webp']
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
