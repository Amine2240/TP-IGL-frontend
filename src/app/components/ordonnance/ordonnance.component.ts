import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-ordonnance',
  standalone: true,
  imports: [],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.scss'
})
export class OrdonnanceComponent {
  downloadSection(): void {
    const section = document.getElementById('sectionToDownload') as HTMLElement;

    // Use html2canvas to capture the section
    html2canvas(section).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF instance
      const pdf = new jsPDF();

      // Get page dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Scale image to fit the page
      const imgWidth = canvas.width / 6; // Adjust scale as needed
      const imgHeight = canvas.height / 5;

      const x = (pdfWidth - imgWidth) / 2; // Center horizontally
      const y = 10; // Add top margin

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('section-download.pdf');
    });
  }

}
