import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRegistryService } from 'src/app/services/template-registry.service';
import { Store } from '@ngrx/store';
import { selectTemplate } from 'src/app/state/actions/selected-template.action';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Template } from 'src/app/model/template.model';
import { SelectedTemplateState } from 'src/app/model/state-model/selected-template-state';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, RouterLink ]
})
export class TemplateSelectorComponent implements OnInit {
  templatesList: Template[] = [];
  selectedTemplate: SelectedTemplateState = {
    id: "",
    templateName: "",
    theme: "",
    hasOverflow: false
  };
  isMobile: boolean = true;
  selectedTemplateIndex: number | null = null;

  constructor (
    private breakpointObserver: BreakpointObserver,
    private templateRegistry: TemplateRegistryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Check if the device is mobile
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    // Get all templates
    this.templatesList = this.templateRegistry.getTemplates();
  }

  selectTemplate(index: number):void {
    this.selectedTemplate = {
      ...this.selectedTemplate,
      id: this.templatesList[index].id,
      templateName: this.templatesList[index].templateName
    };
    this.store.dispatch(
      selectTemplate({ template: this.selectedTemplate })
    );

    if(index === this.selectedTemplateIndex) {
      this.selectedTemplateIndex = null; 
    } else {
      this.selectedTemplateIndex = index;
    }
  }
}