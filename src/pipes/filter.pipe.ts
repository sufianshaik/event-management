import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: Object): any[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item[Object.keys(filter)[0]] === Object.values(filter)[0]);
  }

}
