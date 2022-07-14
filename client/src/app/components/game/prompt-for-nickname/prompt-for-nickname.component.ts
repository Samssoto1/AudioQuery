import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-prompt-for-nickname',
  templateUrl: './prompt-for-nickname.component.html',
  styleUrls: ['./prompt-for-nickname.component.css']
})
export class PromptForNicknameComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  username: string;
  nick: string = "";
  @ViewChild('f') promptForNicknameForm: NgForm;
  subscriptionSelectedQuiz: Subscription;
  quizId: string;
  pin; // only to be used if not a host (comes from subscription in ngoninit from pin component)
  subscriptionPinToNick: Subscription;

  constructor(private gameService: GameService, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {

    // WARNING... BOTH SUBSCRIPTIONS GO OFF CURRENTLY... NEED TO FIX LATER

    
    this.subscriptionPinToNick = this.gameService.pinToNick.subscribe((res) => {
      console.log(res);
      this.pin = res;
    })
    
    // Subscribes no matter what.. so unsubscribe all subscriptions in NgOnDestroy
    // This subscription looks to see if user came from Playgame - is a host of a game
    this.subscriptionSelectedQuiz = this.quizService.selectedQuizInfo.subscribe((quizId) => {
      console.log(quizId);
      console.log("got quizId")
      this.quizId = quizId
    });
    
    

    // Handles display of use username - yes or no
    if(localStorage.getItem('username')){
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username')
    }
    


    }


  useUsername(){
    this.nick = this.username;
  }

  useNick(){
    this.nick = "";
  }
  

  onFormSubmit(){
    if(this.promptForNicknameForm.valid == true){
      console.log(this.promptForNicknameForm.value.nickname)
      if(this.quizId != undefined && this.quizId != "")
      // Handle for Host (provides quizId)
      {
        console.log('is host')
        console.log(this.quizId);
        this.router.navigate(['game']);
        // sends quizId and Nickname if host
        this.gameService.handleQidAndNickname({quizId: this.quizId, nickname: this.promptForNicknameForm.value.nickname});
      }
      else{
        console.log('is else')
        // Handle for room & nickname - Guest or logged in user
        // Sends pin and nickname if not host
        console.log(this.pin);
        this.router.navigate(['game']);
        this.gameService.handlePin({pin: this.pin, nickname: this.promptForNicknameForm.value.nickname})
      }


    }
  }

  ngOnDestroy(){
    if(this.subscriptionPinToNick){
      this.subscriptionPinToNick.unsubscribe();
    }
    if(this.subscriptionSelectedQuiz){
      this.subscriptionSelectedQuiz.unsubscribe();
    }
  }

}
