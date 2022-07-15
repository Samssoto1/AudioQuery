import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.css']
})
export class GameAnswerComponent implements OnInit {

@Input() answer: string;
@Output() outputAnswer = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(answer: string){
    console.log(answer);
    this.outputAnswer.emit(answer);
  }

}
