import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quiz;

  constructor() { }

  ngOnInit(): void {
    console.log(this.quiz);
  }

  onChanges(){
    {{}}
  }

}
