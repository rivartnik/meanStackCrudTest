import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUnits'
})
export class ToUnitsPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value == 0) {
      return "0.00 B";
    }
    var e = Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, e)).toFixed(2) +
      ' ' + ' KMGTP'.charAt(e) + 'B';

  }

}
