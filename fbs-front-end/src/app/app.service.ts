import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getTimeDuration(startTime, endTime){
    let tStart  : any = this.calcTimeDuration(startTime);
    let tStop   : any = this.calcTimeDuration(endTime);
    let minutes : any = Math.abs((tStop - tStart)/(1000*60));
    let hrs = Math.floor(minutes/60);
    let min = minutes%60;
    let duration = hrs + 'Hr ' + min + 'Min';
    return duration;
  }

  calcTimeDuration(cTime){
    if (cTime == '') return null;
    var d = new Date();
    var time = cTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
    d.setHours( parseInt(time[1]) + ( ( parseInt(time[1]) < 12 && time[4] ) ? 12 : 0) );
    d.setMinutes( parseInt(time[3]) || 0 );
    d.setSeconds(0, 0);
    return d;
  }
}
