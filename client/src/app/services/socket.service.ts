import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {io} from "socket.io-client"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket = io(environment.socketUrl);

  startGameConfirm = new ReplaySubject;
  roomId = new BehaviorSubject<string>("0");
  triggerGetNickname = new Subject();
  sendNicknameGetUserList = new Subject();
  joinedLobby = new Subject();
  
  constructor(){
  }

  connect(){
    this.socket.connect();
  }

  disconnect(){
    this.socket.disconnect();
    this.socket.removeListener('joinLobby');
  }

  emit(event: string, data){
    console.log('emitting')
    console.log(event);
    console.log(data);
    this.socket.emit(event, data)
  }

  createLobby(){
    console.log('in createLobby')
    let observable = new Observable(observer => {
      this.socket.on('sendId', (data) => {
        console.log('++++')
        observer.next(data);
      });
    });
    return observable;
  }

  startGame(){
    // this.socket.emit("startGame", "");
    // this.socket.on('lobbyJoined', () => {
      // this.confirmStartGame.next("");
    // })
    let observable = new Observable(observer => {
      this.socket.on('startGameConfirmed', (socketId) => {
        // console.log(socketId);
        console.log('in socket.service - startGame')
        this.startGameConfirm.next(socketId)
        observer.next(socketId)
      });
    });
    return observable;
  }

  joinLobby(object: any){
    this.socket.emit('joinLobby', object);
    this.socket.on('lobbyJoined', () => {
      this.joinedLobby.next("");
    })
  }

}
