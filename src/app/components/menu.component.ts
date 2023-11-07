import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #navbar class="navbar no-print">
      <a (click)="trigger.emit('transpose')">
        <i class="fa fa-fw fa-sliders"></i>
      </a>

      <a (click)="trigger.emit('print')">
        <i class="fa fa-fw fa-print"></i>
      </a>
      <a (click)="trigger.emit('file')">
        <i class="fa fa-fw fa-file"></i>
      </a>
      <a class="icon" (click)="toggle(navbar)"> &#9776; </a>
    </div>
  `,
})
export class MenuComponent {
  @Output() trigger = new EventEmitter<'file' | 'transpose' | 'print'>();
  toggle(elem: HTMLDivElement) {
    elem.className === 'navbar no-print'
      ? (elem.className += ' responsive')
      : (elem.className = 'navbar  no-print');
  }
}
