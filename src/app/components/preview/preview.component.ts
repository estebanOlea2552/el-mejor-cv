import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { MatFormFieldModule } from '@angular/material/form-field';
import { PreviewConnectorService } from 'src/app/services/preview-connector.service';
import { MatCardModule } from '@angular/material/card';

import { WorkerI } from 'src/app/interfaces/cv.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatButtonModule]
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cv')cv!: ElementRef<HTMLDivElement>
  workerPreview: WorkerI = {
    name: '',
    lastname: '',
    jobPosition: '',
    aboutMe: '',
    academicBackground: [{
      grade: '',
      school: '',
      academicBackgroundInitDate: '',
      academicBackgroundEndDate: '',
      description: ''
    }],
    workExperience: [{
      position: '',
      company: '',
      workExperienceInitDate: '',
      workExperienceEndDate: '',
      description: ''
    }],
    skills: ['']
  };
  
  currentValueSuscription: Subscription | undefined;

  constructor(private previewConnector: PreviewConnectorService) {}

  ngAfterViewInit(): void {
    this.currentValueSuscription = this.previewConnector.fieldCurrentValue$.subscribe((workerData) => {
      this.updateWorkerPreview(workerData.field, workerData.value);
    })
  }

  updateWorkerPreview(controlName: string, value: any) {
    const keys: string[] = controlName.split('.');
    if (keys.length === 1) {
      (this.workerPreview as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (this.workerPreview as any)[keys[0]][keys[1]] = value;
    }
  }

  generatePDF() {
    const elements = document.querySelectorAll('.text-content')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'A4'
    })
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);

    let positionX = 0;
    let positionY = 0;

    elements.forEach((element) => {
      const text = element.textContent || "";
      pdf.text(text, positionX, positionY);
      positionX = positionX + 10;
      positionY = positionY + 10;
    })
    pdf.save('pdf')
  }

  ngOnDestroy(): void {
    if(this.currentValueSuscription){
      this.currentValueSuscription.unsubscribe();
    }
  }
}