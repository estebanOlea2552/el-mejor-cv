import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { cvData } from 'src/app/model/cv-data.model';
import { cvDataInit } from 'src/app/model/cv-data-init';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css'],
  standalone: true,
  imports: [ CommonModule ]
})
export class Template1Component implements OnInit {
  @ViewChild('cvContent', {static: true}) cvContent!: ElementRef;
  @Input() cvPreview: cvData = cvDataInit;

  constructor(private exportCv: ExportService) {}

  ngOnInit(): void {
    /* Takes the cvContent element as HTML and sends it to the Export Service */
    this.exportCv.setCvToExport(this.cvContent);
  }

  /* Recibe un campo de cvPreview (object) y la clave de dicho campo (keys) que se desea evaluar */
  hasValues(object: any, keys: string[]): boolean {
    if (!object) return false; /* Si el campo no existe dentro de cvPreview, devuelve false */
    return keys.some(key => !!String(object[key] ?? '').trim());
    /* .some() verifica si al menos un elemento cumlpe la condición, la función anónima devuelve false si object[key] no contiene ningún valor */
  }
}