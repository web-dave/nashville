import { Pipe, PipeTransform } from '@angular/core';
import { numbers } from '../utils/numbers';

@Pipe({
  name: 'nashville',
  standalone: true,
})
export class NashvillePipe implements PipeTransform {
  transform(value: string, scale: string[]): string {
    let output = value;
    numbers
      .map((n) => n.replace('m', ''))
      .map((n) => '#' + n)
      .forEach((n, i) => {
        output = output.replaceAll(n, ' ' + scale[i].replace('m', ''));
      });
    return output;
  }
}
