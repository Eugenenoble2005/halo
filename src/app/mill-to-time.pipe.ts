import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millToTime'
})
export class MillToTimePipe implements PipeTransform {

  transform(millis:number): unknown {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
  }

}
