import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import {io} from "socket.io-client"
import { environment } from 'src/environments/environment';
// Socket.io-client is a library... limited??
// import {Socket, SocketIoConfig} from "ngx-socket-io";

// const config: SocketIoConfig = {
//   url: environment.socketUrl, //socket server url;
//   options: {
//     transports: ['websocket'],
//     autoConnect: false
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket = io(environment.socketUrl);

  roomId = new BehaviorSubject<string>("0");
  triggerGetNickname = new Subject();
  sendNicknameGetUserList = new Subject();
  joinedLobby = new Subject();
  // clientSocket: any;
  // private socket: Socket
  // socket;
  
  constructor(){
  }

  connect(){
    this.socket.connect();
    // this.socket.ioSocket.io.opts.query = { token: 'minuevotoken' } //new options
    // this.socket.ioSocket.io.uri = "http://localhost:3001" //new uri
    // console.log('in connect')
    // this.socket.connect(); //manually connection
    // console.log('attempting to connect')
    // this.socket = this.injector.get(Socket)
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
      // return () => {this.socket.disconnect();}
    });
    return observable;

    // console.log('=========')
    // this.connect();
    // console.log('made it out of connect method')
    // this.socket.emit('createLobby');
    // this.socket.on('sendId', (data) => {
    //   console.log('+++++++')
    //   this.roomId.next(data)
    // })
  }

  joinLobby(object: any){
    this.socket.emit('joinLobby', object);
    this.socket.on('lobbyJoined', () => {
      this.joinedLobby.next("");
    })
  }

  sendNickname(nickname: string){
    // this.socket.emit('sendNickname', nickname);
    // this.socket.on('sendNicknameGetUserList', (userList) => {

    //   console.log(userList);
    //   this.sendNicknameGetUserList.next(userList);
    // })
  }

}
