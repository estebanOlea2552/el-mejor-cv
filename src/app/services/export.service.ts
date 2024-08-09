import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private cvToExport: ElementRef | undefined;
  private doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'A4'
  })

constructor() { }
  
  public setCvToExport(cv: ElementRef){
    this.cvToExport = cv;
  }

  public generatePdf(): void {
    const content = this.cvToExport?.nativeElement;

    if (!content) {
      console.error('Element not found');
      return;
    }

    const pdfWidth = this.doc.internal.pageSize.getWidth();

    this.doc.html(content, {
      callback: (doc) => {
        doc.save('documento.pdf');
      },
      x: 0,
      y: 0,
      width: pdfWidth,
      windowWidth: content.scrollWidth,
      html2canvas: {
        scale: 0.4288 //la proporción perfecta
      },
    });
  }
}
