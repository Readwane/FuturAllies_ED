import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {
  @Input() pdfSrc: string | ArrayBuffer | Uint8Array = '';

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.pdfSrc = fileReader.result as ArrayBuffer;
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  ngOnInit(): void {
    console.log('Docuements viewer in PdfViewerComponent');
}
}