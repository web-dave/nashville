import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { file } from '../file';
import { IKey } from '../utils/keymaps';
import { SongComponent } from './song.component';
import { KeyTableComponent } from './key-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SongComponent, KeyTableComponent],
  template: ` <key-table (keySelected)="selectKey($event)" /> <br />
    <input type="file" (change)="handleFileInput($event)" />
    <app-song [text]="file()" [key]="selectedKey()" />`,
})
export class AppComponent {
  selectedKey: WritableSignal<IKey> = signal('C');
  file: WritableSignal<string[]> = signal([]);

  selectKey(e: string) {
    this.selectedKey.update(() => e as IKey);
  }

  handleFileInput(e: Event) {
    const file: File | null | undefined = (
      e.target as HTMLInputElement
    )?.files?.item(0);
    (e.target as HTMLInputElement)?.files
      ?.item(0)
      ?.text()
      .then((data) => this.file.set(data.split('/n')));
  }
}
