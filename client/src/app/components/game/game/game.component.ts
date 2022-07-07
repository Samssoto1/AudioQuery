import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  roomId: any;
  subscription: Subscription;
  useNickname: boolean;

  @Input() sendNickname: string;


  constructor(private socketService: SocketService, private authService: AuthService) { }

  ngOnInit(): void {
    let isLoggedIn = this.authService.getIsAuth();
    console.log(isLoggedIn);
    
    // if user is signed in... load quiz id from params and set bool to true and display game options
    if(isLoggedIn == true){
      

      // If useNickname == false... use username
      // if(){

      // }

      this.socketService.createLobby(); // Create lobby and store id in service subject
      this.subscription = this.socketService.roomId.subscribe( (result) => { // subscribe to the subject from the service to get the roomId
        this.roomId = result;
      });


    }
    // else, guest user.. prompt nickname and wait for game to start.
  }


  ngOnDestroy(){
      this.subscription.unsubscribe();

      // cant figure out how to leave socket.. breaks getting the room ID

      // this.socketService.leaveSocket();
  }

}
