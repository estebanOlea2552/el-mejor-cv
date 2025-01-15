import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private cvToExport: ElementRef | undefined;
  private doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'A4'
  })

constructor() { }
  
  public setCvToExport(cv: ElementRef) {
    if(cv) {
      this.cvToExport = cv;
    }
  }

  public generatePdf(): void {
    const content = this.cvToExport?.nativeElement;
    if (!content) {
      console.error('CV html element not found');
      return;
    }
    const pdfWidth = this.doc.internal.pageSize.getWidth();
    this.doc.html(content, {
      callback: (doc) => {
        doc.deletePage(2); /* Trash code */
        doc.save('curriculum.pdf');
      },
      x: 0,
      y: 0,
      width: pdfWidth,
      windowWidth: content.scrollWidth,
      html2canvas: {
        scale: 1.5
      },
    });
  }
}
