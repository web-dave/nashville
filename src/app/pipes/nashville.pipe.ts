import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nashville',
  standalone: true,
})
export class NashvillePipe implements PipeTransform {
  transform(value: string, scale: string[], numbers: string[]): string {
    let output = value;
    numbers.forEach((n, i) => {
      output = output.replaceAll(n, scale[i]);
    });
    return output;
  }
}
