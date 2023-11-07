import {
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IKey, keyMap } from '../utils/keymaps';
import { SongComponent } from './song.component';
import { KeyTableComponent } from './key-table.component';
import { MenuComponent } from './menu.component';
import { jsPDF } from 'jspdf';
import { NashvillePipe } from '../pipes/nashville.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SongComponent,
    KeyTableComponent,
    MenuComponent,
    NashvillePipe,
  ],
  template: ` @if(showTable){
    <key-table (keySelected)="selectKey($event)" /> <br />
    }
    <input
      #fileLoad
      hidden
      type="file"
      (change)="handleFileInput($event)"
      accept=".txt"
    />
    @if(file().length >= 1){
    <app-song [text]="file()" [key]="selectedKey()" />
    }@else{
    <div class="container">
      <label class="centered">
        <i class="fa fa-fw fa-file" (click)="fileLoad.click()"></i>
      </label>
    </div>
    <app-menu (trigger)="handleTrigger($event)" />
    }`,
})
export class AppComponent {
  @ViewChild('fileLoad') fileLoad!: ElementRef<HTMLInputElement>;
  showTable = false;
  selectedKey: WritableSignal<IKey> = signal('C');
  file: WritableSignal<string[]> = signal([]);
  name = '';

  handleTrigger(event: 'file' | 'transpose' | 'print') {
    switch (event) {
      case 'file':
        this.fileLoad.nativeElement.click();
        break;
      case 'transpose':
        this.showTable = !this.showTable;
        break;
      case 'print':
        this.print();
        break;
    }
  }

  selectKey(e: string) {
    this.selectedKey.update(() => e as IKey);
  }

  handleFileInput(e: Event) {
    this.name = (
      (e.target as HTMLInputElement)?.files?.item(0)?.name || ''
    ).replace('.txt', '');

    (e.target as HTMLInputElement)?.files
      ?.item(0)
      ?.text()
      .then((data) => this.file.set(data.split('/n')));
  }

  print() {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setTextColor('#000000');
    // doc.addFont('Times', 'times', 'normal');
    doc.setFont('courier');
    console.log(doc.getFontList());

    console.log(document.querySelector('pre')?.textContent);

    this.file()[0]
      .split('\n')
      .forEach((ln, i) => {
        console.log(i % 2);

        if (i % 2 === 0) {
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
