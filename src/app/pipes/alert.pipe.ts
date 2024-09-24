import { Pipe, PipeTransform } from '@angular/core';
import { alertType } from '@models/alert.model';

@Pipe({
  name: 'alert',
  standalone: true
})
export class AlertPipe implements PipeTransform {

  readonly colors: { [K in alertType]: alertClasses } = {
    info: {
      container: 'text-blue-800 dark:text-blue-400 bg-blue-50 ',
      close: 'bg-blue-50 hover:bg-blue-200 focus:ring-blue-400  dark:text-blue-400'
    },
    danger: {
      container: 'text-red-800 dark:text-red-400 bg-red-50 ',
      close: 'bg-red-50 hover:bg-red-200 focus:ring-red-400  dark:text-red-400'
    },
    warning: {
      container: 'text-yellow-800 dark:text-yellow-400 bg-yellow-50 ',
      close: 'bg-yellow-50 hover:bg-yellow-200 focus:ring-yellow-400  dark:text-yellow-400'
    },
    success: {
      container: 'text-green-800 dark:text-green-400 bg-green-50 ',
      close: 'bg-green-50 hover:bg-green-200 focus:ring-green-400  dark:text-green-400'
    }
  }

  transform(alertType: alertType, key: keyof alertClasses): string {

    return this.colors[alertType][key];
  }

}

interface alertClasses {
  container: string,
  close: string
}
