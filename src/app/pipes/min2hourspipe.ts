import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'min2hourspipe'
})

export class MinutesToHoursPipe implements PipeTransform {
  transform(value: string): string {
    if (value !== undefined && value !== "N/A") {      
      const oldValue: number = Number(value.replace(' min', ''));
      const hours = (oldValue / 60);
      const hoursRounded = Math.floor(hours);
      const minutes = ((hours - hoursRounded) * 60);
      const minutesRounded = Math.round(minutes);
      if (hoursRounded > 0) {
        return `${hoursRounded}h ${minutesRounded}m`;
      } else {
        return `${minutesRounded}m`;
      }
    } else {
      return 'N/A';
    }
  }
}