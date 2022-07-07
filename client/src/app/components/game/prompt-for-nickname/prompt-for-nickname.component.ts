import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-prompt-for-nickname',
  templateUrl: './prompt-for-nickname.component.html',
  styleUrls: ['./prompt-for-nickname.component.css']
})
export class PromptForNicknameComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string;
  nick: string = "";
  @ViewChild('f') promptForNicknameForm: NgForm;
  @Output() sendNickname = new EventEmitter<string>();


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    if(localStorage.getItem('username')){
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
      this.sendNickname.emit(this.promptForNicknameForm.value.nickname);
      // this.router.navigate(['game'])
    }
  }

}
