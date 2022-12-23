import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject} from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  processRoomIdValue = new Subject();

  pinToNick = new BehaviorSubject("");
  processPin = new BehaviorSubject({});
  processQidAndNickname = new BehaviorSubject("");


  
  joinLobby = new Subject();
  startGame = new Subject();

  // Game
  gameQuestions = new Subject();
  answerChosen = new Subject();

  // Audio
  audio

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

  // Game

  handleGameQuestions(){
    this.gameQuestions.next("")
  }

  deliverAnswerChosen(){
    this.answerChosen.next("")
  }

  /* Experimental Audio Service.. */
    // added because IOS does not allow autoplay audio unless triggered by action

  // init Audio object
  createAudioObject(){
    this.audio = new Audio(); // Create the default audio object
    // loading an init short audio src on button click allows us to play audio on IOS
    this.audio.src = "https://github.com/Samssoto1/MyAudioAppSongDb/raw/main/test.mp3" // set the initial source to a very short 1 second silent audio
    this.audio.load()
    this.audio.play()
  }

  // change audio src to different songs
  changeAudioSource(audioLink){
    this.audio.src = audioLink;

  }

  // change audio volume
  changeAudioVolume(amount){
    this.audio.volume = amount;
    console.log("changing amount")

  }

  // play audio
  playAudio(){
    this.audio.play();
  }

  // pause audio
  pauseAudio(){
    this.audio.pause();
  }

}
