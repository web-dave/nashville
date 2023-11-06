import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navbar no-print">
      <a (click)="trigger.emit('transpose')">
        <i class="fa fa-fw fa-sliders"></i>
      </a>

      <div class="nav-right">
        <a (click)="trigger.emit('file')">
          <i class="fa fa-fw fa-file"></i>
        </a>
      </div>
    </div>
  `,
})
export class MenuComponent {
  @Output() trigger = new EventEmitter<'file' | 'transpose'>();
}
