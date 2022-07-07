import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prompt-for-nickname',
  templateUrl: './prompt-for-nickname.component.html',
  styleUrls: ['./prompt-for-nickname.component.css']
})
export class PromptForNicknameComponent implements OnInit {


  useNickname: boolean = false;
  @ViewChild('f') promptForNicknameForm: NgForm;
  @Output() sendNickname = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(){
    if(this.promptForNicknameForm.valid == true){
      this.sendNickname.emit(this.promptForNicknameForm.value.nickname);
    }
  }

}
