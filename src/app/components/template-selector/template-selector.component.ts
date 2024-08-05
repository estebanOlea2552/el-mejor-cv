import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips'
import { TemplateRegistryService } from 'src/app/services/TemplateRegistry.service';
import { TemplateI } from 'src/app/interfaces/templateI';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
  standalone: true,
  imports: [ CommonModule, MatChipsModule ]
})
export class TemplateSelectorComponent implements OnInit {
  protected templates!: TemplateI[];
  protected selectedTemplate: string = '';

  constructor(private templateRegistry: TemplateRegistryService, private previewConnector: PreviewConnectorService) {}

  ngOnInit(): void {
    this.templates = this.templateRegistry.getTemplates();
  }

  protected selectTemplate(templateId: string) {
    this.selectedTemplate = templateId;
    this.previewConnector.updateSelectedTemplate(this.selectedTemplate);
  }
}
