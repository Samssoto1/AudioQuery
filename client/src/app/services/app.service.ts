import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  backgroundColor = new Subject();

  constructor() { }

  updateBackgroundColor(color, backgroundAnimation){
    this.backgroundColor.next({color: color, backgroundAnimation});
  }
}
