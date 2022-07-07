import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
// import * as socketIo from "socket.io-client"
// Socket.io-client is a library... limited??
import {Socket} from "ngx-socket-io";


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  roomId = new Subject<string>();
  // clientSocket: any;
  
  constructor(private socket: Socket){
  }

  createLobby(){
    let data;
    this.socket.emit('createLobby');
    this.socket.on('sendId', (data) => {
      this.roomId.next(data)
    })
  }

  // leaveSocket(){
  //   this.socket.disconnect();
  // }




}
