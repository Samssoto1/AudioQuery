import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  processRoomIdValue = new Subject();



  processPin = new ReplaySubject();
  // processQidAndNickname = new Subject();
  // processQidAndNickname = new BehaviorSubject("0");
  processQidAndNickname = new ReplaySubject(1);
  pinToNick = new ReplaySubject();
  
  joinLobby = new Subject();
  startGame = new Subject();

  constructor() { }

  handleRoomIdValue(roomId: string, socketId: string, quizQuestions){
    this.processRoomIdValue.next({roomId: roomId, socketId: socketId, quizQuestions: quizQuestions});
    
  }

  handlePin(object: any){
    // pin and nickname
    this.processPin.next({pin: object.pin, nickname: object.nickname});
  }

  pinToNickname(object: any){
    console.log('pinToNick')
    console.log
    this.pinToNick.next(object)
  }

  handleQidAndNickname(object: any){
    console.log(object);
    this.processQidAndNickname.next(object);
  }
}
