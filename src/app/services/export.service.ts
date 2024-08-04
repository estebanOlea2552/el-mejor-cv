import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  jsPdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'A4'
  })

constructor() { }
  
  generatePdf(elementId: string): void {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error('Element not found');
      return;
    }

    const doc = new jsPDF();
    const pdfWidth = doc.internal.pageSize.getWidth();

    doc.html(element, {
      callback: (doc) => {
        doc.save('documento.pdf');
      },
      x: 0,
      y: 0,
      width: pdfWidth,
      windowWidth: element.scrollWidth,
      html2canvas: {
        scale: 0.4288 //la proporción perfecta
      },
    });
  }
}
