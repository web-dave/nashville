import {
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IKey, keyMap, keys } from '../utils/keymaps';
import { SongComponent } from './song.component';
import { jsPDF } from 'jspdf';
import { NashvillePipe } from '../pipes/nashville.pipe';
import { numbers } from '../utils/numbers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SongComponent, NashvillePipe],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('fileLoad') fileLoad!: ElementRef<HTMLInputElement>;
  showTable = false;
  selectedKey: WritableSignal<IKey> = signal('C');
  file: WritableSignal<string[]> = signal([]);
  name = '';
  navOpen = false;
  keys = keys;

  selectKey(e: string) {
    this.selectedKey.update(() => e as IKey);
  }

  handleFileInput(e: Event) {
    this.name = ((e.target as HTMLInputElement)?.files?.item(0)?.name || '')
      .replace('.txt', '')
      .replace(/number system/gi, '')
      .replace('()', '');

    (e.target as HTMLInputElement)?.files
      ?.item(0)
      ?.text()
      .then((data) => this.file.set(data.split('/n')));
  }

  print() {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setTextColor('#000000');
    doc.setFont('courier');

    this.file()[0]
      .split('\n')
      .forEach((ln, i) => {
        if (numbers.some((n) => ln.includes('#' + n))) {
          doc.setFont('courier', 'bold');
        } else {
          doc.setFont('courier', 'normal');
        }
        const transLn = new NashvillePipe().transform(
          ln,
          keyMap[this.selectedKey()]
        );
        doc.text(transLn, 10, i * 5 + 10);
      });
    doc.save(this.name + ` (${this.selectedKey()})`);
  }
}
