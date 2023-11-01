import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { IKey, keyMap, keys } from '../utils/keymaps';
import { numbers } from '../utils/numbers';

@Component({
  selector: 'key-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <thead>
        <th>Key</th>
        @for(key of keys; track key){
        <th [class.active]="selectedKey() === key" (click)="selectKey(key)">
          <button (click)="selectKey(key)">{{ key }}</button>
        </th>
        }
      </thead>
      <tbody>
        <tr>
          <th>#</th>
          @for(n of numbers; track n){
          <th>{{ n }}</th>
          }
        </tr>
        <tr>
          <td>Chord</td>
          @for(key of keys; track key; let i = $index;){
          <td>
            {{ keyMap[selectedKey()][i] }}
          </td>
          }
        </tr>
      </tbody>
    </table>
  `,
})
export class KeyTableComponent {
  @Output() keySelected = new EventEmitter<IKey>();

  selectedKey: WritableSignal<IKey> = signal('C');
  keyMap = keyMap;
  keys = keys;
  numbers = numbers;

  selectKey(e: string) {
    this.selectedKey.update(() => e as IKey);
    this.keySelected.emit(e as IKey);
  }
}
