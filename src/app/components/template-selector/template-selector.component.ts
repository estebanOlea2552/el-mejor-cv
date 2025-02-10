import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Template } from 'src/app/model/template.model';
import { SelectedTemplateState } from 'src/app/model/state-model/selected-template-state';
import { MatIconModule } from '@angular/material/icon';
import { TemplateRegistryService } from 'src/app/shared/services/template-registry.service';
import { AppState } from 'src/app/shared/state/app.state';
import { selectTemplate } from 'src/app/shared/state/actions/selected-template.action';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatIconModule]
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
  miniatures: Record<number, string> = {};
  currentIndexes: Record<number, number> = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private templateRegistry: TemplateRegistryService,
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    // Check if the device is mobile
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
    
    // Get all templates
    this.templatesList = this.templateRegistry.getTemplates();

    // Initialize miniatures and current indexes
    this.templatesList.forEach((template, index) => {
      this.miniatures[index] = template.miniaturesReg?.[0] || "";
      this.currentIndexes[index] = 0;
    });
  }
  
  selectTemplate(index: number): void {
    this.selectedTemplate = {
      ...this.selectedTemplate,
      id: this.templatesList[index].id,
      templateName: this.templatesList[index].templateName
    };
    this.store.dispatch(
      selectTemplate({ template: this.selectedTemplate })
    );

    if (index === this.selectedTemplateIndex) {
      this.selectedTemplateIndex = null;
    } else {
      this.selectedTemplateIndex = index;
    }
  }

  prevMiniature(index: number): void {
    if (index < 0 || index >= this.templatesList.length) return;
    
    const miniatures: string[] = this.templatesList[index]?.miniaturesReg || [];
    if (miniatures.length === 0) return;
    
    if (this.currentIndexes[index] > 0) {
      this.currentIndexes[index]--;
    } else {
      this.currentIndexes[index] = miniatures.length - 1;
    }
    this.miniatures[index] = miniatures[this.currentIndexes[index]];
  }

  nextMiniature(index: number): void {
    if (index < 0 || index >= this.templatesList.length) return;
    
    const miniatures: string[] = this.templatesList[index]?.miniaturesReg || [];
    if (miniatures.length === 0) return;
    
    if (this.currentIndexes[index] < miniatures.length - 1) {
      this.currentIndexes[index]++;
    } else {
      this.currentIndexes[index] = 0;
    }
    this.miniatures[index] = miniatures[this.currentIndexes[index]];
  }
}