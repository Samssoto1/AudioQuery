import { Component, OnInit, Input, OnDestroy, NgZone, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription, pipe, skip, first, mergeMap, filter, catchError, concatMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { HttpService } from 'src/app/services/http.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
  isLoaded: boolean = false;
  list_of_users_joined = [];
  roomId
  subs: Subscription[] = [];
  // subscriptionSelectedQuiz: Subscription;
  subscriptionGetSocketRoom: Subscription;
  subscriptionDeleteRoom: Subscription
  
  subscriptionHttpQID: Subscription
  subscriptionHttpR: Subscription
  
  username;
  nickname;
  
  isHost: boolean = false;
  
  @Input() sendNickname: string;
  
  subscriptionGetQuizId: Subscription
  subscriptionHost: Subscription
  subscriptionElse: Subscription
  quizId;
  quizInfo;

  bob: boolean = false;


  list_of_users = [];
  playGame;
  loaded: boolean = false;
  roomInfo

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private socketService: SocketService, private authService: AuthService, private gameService: GameService, private quizService: QuizService) {

  }
  
  ngOnInit() {
    // Using params because it's faster than subject subscription. Allows me to segregate the host from another user
    // Host check is kind of unsafe... need to find another way to fix this. Currently it checks if a quizId isn't provided & if user is logged in, and if LS username = to quizId owner. IF JWT token validation is changed upon editing username.. this is safe. Otherwise, not.

    // This may be to slow to work
    this.subscriptionGetQuizId = this.quizService.selectedQuizInfo.subscribe((quizId) => {
      this.quizId = quizId;
    })

    console.log(this.quizId);

    // NOTE - DOESN'T WORK THE FIRST TIME FOR SOME REASON... MUST BE RAN TWICE.
    // ALSO NEEDS USER CHECKING IN CASE USER BREAKS THINGS.. LIKE HOST RELOADING PAGE,  ETC...

    // If user is the host
    if(this.quizId){
      console.log('in hre')
      this.subscriptionHost = this.gameService.processQidAndNickname.pipe( // get nickname
        concatMap(res => this.httpService.get('getQuizById', res['quizId'])), // get quizInfo using quizId (quizId gotten if host)
        tap(quizInfo => {console.log(quizInfo); this.quizInfo = quizInfo; console.log(quizInfo['authorId']);}),
        tap(res => this.socketService.connect()), // connect to socket
        tap(res => this.socketService.emit('createLobby', '')), // emit createLobby event to get ID of host
        concatMap(res => this.socketService.createLobby()), // delivers
        concatMap(socketId => this.httpService.post('createRoom', {quizId: this.quizId, socketId: socketId})), // creates room in db and stores above info
        ).subscribe(response => {
          this.roomId = response.toString();
        // PUSH roomID TO SUBJECT
        this.gameService.handleRoomIdValue(this.roomId);
      });

      // Get RoomId from Subject and update DOM
      this.subscriptionGetSocketRoom = this.gameService.processRoomIdValue.subscribe((roomId) => {
      this.isLoaded = true;
      this.isHost = true;
      this.roomId = roomId;
      })
      }
    
      // If user isn't a host
      if(!this.quizId){ 
        console.log('not a host')
        this.subscriptionElse = this.gameService.processPin.pipe( // get pin
          tap(res => {
            this.roomInfo = res['pin']; this.nickname = res['nickname'];
          }),
          // concatMap(res => this.httpService.get('getRoom', this.roomInfo._id)), // get room Info
          // tap(res => this.roomInfo = res),
          concatMap(res => this.httpService.get('getQuizById', this.roomInfo.quizId)), // get quizInfo using quizId from roomInfo
          tap(quizInfo => {console.log(quizInfo); this.quizInfo = quizInfo; console.log(quizInfo['authorId']);}),
          tap(res => this.socketService.connect()), // connect to socket
          tap(res => this.socketService.emit('joinLobby', {socketId: this.roomInfo.socketId, nickname: this.nickname})), // emit createLobby event to get ID of host
          tap(res => this.socketService.emit('getRoomInfo', this.roomInfo.socketId))
          ).subscribe(response => {
            this.roomId = this.roomInfo._id;
            this.isLoaded = true;
            console.log('end')
        });
  
      }

    
    }

    
  startGame(){
    
  }


    test(){
      console.log(this.roomId)
    }


  ngOnDestroy(){
    console.log(this.roomId);
    this.socketService.disconnect();
    console.log('in destroy')

    if(!this.isHost){
      this.subscriptionGetQuizId.unsubscribe()
      this.subscriptionElse.unsubscribe();
    }


    if(this.isHost){
      // If user is host and has left the room - delete the room from db
      console.log('deleting room')
      this.subscriptionHost.unsubscribe();
      this.subscriptionGetSocketRoom.unsubscribe();
      // this.subscriptionGetSocketRoom.unsubscribe();

      // this.subscriptionHttpQID.unsubscribe();
      // this.subscriptionHttpR.unsubscribe();
      this.httpService.delete('deleteRoom', this.roomId).subscribe( () => {
      
      // this.subscriptionHttpQID.unsubscribe();
      })









      
      // if(this.subscriptionGetSocketRoom){
      //   console.log('unsubscribing from getSocketRoom')
      //   this.subscriptionGetSocketRoom.unsubscribe();
      // }

      // if(this.subscriptionProcessNick){
      //   this.subscriptionProcessNick.unsubscribe();
      // }

      // if(this.subscriptionGetPin){
      //   this.subscriptionGetPin.unsubscribe();
      // }
      
      // if(this.subscriptionSocketGetNickname){
      //   this.subscriptionSocketGetNickname.unsubscribe()
      // }
    
      // if(this.subscriptionSocketSendNickname){
      //   this.subscriptionSocketSendNickname.unsubscribe();
      // }

      // if(this.subscriptionSocketJoinedLobby){
      //   this.subscriptionSocketJoinedLobby.unsubscribe();
      // }
  }

}

}
