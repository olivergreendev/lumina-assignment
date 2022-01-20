import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'min2hourspipe'
})

export class MinutesToHoursPipe implements PipeTransform {
  transform(value: string): string {
    if (value !== undefined) {      
      const oldValue: number = Number(value.replace(' min', ''));
      if (oldValue > 0 && (oldValue / 60) < 1) {
        return String(Math.round(oldValue) + 'm');
      } else {
        return String(Math.round((oldValue / 60)) + 'h');
      }
    } else {
      return 'N/A';
    }
  }
}