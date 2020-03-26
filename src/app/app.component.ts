import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tesseract.js-angular-app';
  ocrResult = 'Recognizing...';
  selectedFile: ImageSnippet;

  constructor() {
  }

  yourName = '';

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.doOCR(this.selectedFile.src);

    });

    reader.readAsDataURL(file);
  }

  async doOCR(url) {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(url);
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }
}
