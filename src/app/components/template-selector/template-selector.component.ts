import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRegistryService } from 'src/app/services/template-registry.service';
import { Template } from 'src/app/model/template.model';
import { Store } from '@ngrx/store';
import { selectTemplate } from 'src/app/state/actions/template.action';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
  standalone: true,
  imports: [ CommonModule, MatCardModule ]
})
export class TemplateSelectorComponent implements OnInit {
  protected isMobile: boolean = false;
  protected templates: Template[] = [];
  protected selectedTemplate: Template = {
    id: "",
    templateName: "",
    component: ""
  };

  constructor (
    private breakpointObserver: BreakpointObserver,
    private templateRegistry: TemplateRegistryService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
    // Get all templates
    this.templates = this.templateRegistry.getTemplates();
  }

  protected selectTemp(templateId: string):void {
    this.selectedTemplate = {
      ...this.selectedTemplate,
      id: templateId,
    };
    this.store.dispatch(selectTemplate({ template: this.selectedTemplate }));
  }
}