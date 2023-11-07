import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NashvillePipe } from '../pipes/nashville.pipe';
import { numbers } from '../utils/numbers';
import { IKey, keyMap } from '../utils/keymaps';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule, NashvillePipe],
  template: `
    @for(line of text; track line){
    <pre class="song">{{ line | nashville : keyMap[key] }}</pre>
    }
  `,
  styles: `
  :host{
    display: block;
    margin: 8px;
  }
  `,
})
export class SongComponent {
  @Input({ required: true }) key: IKey = 'C';
  @Input({ required: true }) text: string[] = [];
  keyMap = keyMap;
}
