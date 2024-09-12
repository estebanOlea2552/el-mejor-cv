import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips'
import { TemplateRegistryService } from 'src/app/services/template-registry.service';
import { Template } from 'src/app/model/template.model';
import { Store } from '@ngrx/store';
import { selectTemplate } from 'src/app/state/actions/template.action';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
  standalone: true,
  imports: [ CommonModule, MatChipsModule ]
})
export class TemplateSelectorComponent implements OnInit {
  protected templates: Template[] = [];
  protected selectedTemplate: Template = {
    id: "",
    templateName: "",
    component: ""
  };

  constructor (
    private templateRegistry: TemplateRegistryService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Get all templates
    this.templates = this.templateRegistry.getTemplates();
  }

  protected selectTemp(templateId: string):void {
    this.selectedTemplate = {
      ...this.selectedTemplate,
      id: templateId,
    };
    this.store.dispatch(selectTemplate({ template: this.selectedTemplate }));
    console.log(this.selectedTemplate.id);
  }
}