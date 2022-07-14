import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{

  @Input() questionInfo;
  @Input() quizId;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  newQuestion(quizId: string){
    console.log(quizId);
    this.router.navigate(["/quiz/create-a-quiz-question", quizId])
    
  }

}
