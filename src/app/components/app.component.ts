import {
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IKey } from '../utils/keymaps';
import { SongComponent } from './song.component';
import { KeyTableComponent } from './key-table.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SongComponent,
    KeyTableComponent,
    MenuComponent,
  ],
  template: ` <app-menu (trigger)="handleTrigger($event)" />
    @if(showTable){
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
      <label class="centered-label" for="input">
        <i class="fa fa-fw fa-file" (click)="fileLoad.click()"></i>
      </label>
    </div>
    }`,
})
export class AppComponent {
  @ViewChild('fileLoad') fileLoad!: ElementRef<HTMLInputElement>;
  showTable = false;
  selectedKey: WritableSignal<IKey> = signal('C');
  file: WritableSignal<string[]> = signal([]);

  handleTrigger(event: 'file' | 'transpose') {
    switch (event) {
      case 'file':
        this.fileLoad.nativeElement.click();
        break;
      case 'transpose':
        this.showTable = !this.showTable;
        break;
    }
  }

  selectKey(e: string) {
    this.selectedKey.update(() => e as IKey);
  }

  handleFileInput(e: Event) {
    (e.target as HTMLInputElement)?.files
      ?.item(0)
      ?.text()
      .then((data) => this.file.set(data.split('/n')));
  }
}
