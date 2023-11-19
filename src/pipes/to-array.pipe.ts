import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    if (value instanceof Map) {
      let result: any[] = [];
      value.forEach((val, key) => {
        result.push(val);
      });
      return result;
    }
    return Object.values(value);
  }
}
