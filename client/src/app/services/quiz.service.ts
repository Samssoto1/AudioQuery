import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  updateQList = new Subject<boolean>();
  // selectedQuizInfo = new Subject<string>();
  // selectedQuizInfo = new BehaviorSubject<string>('');
  selectedQuizInfo = new ReplaySubject<string>();
  
  constructor() { }

  updateQuizList(quizId){
    // theres really no need for quizId but I need to send something to use next and subscribe...
    this.updateQList.next(quizId);
  }

  getSelectedQuiz(quizId){
    console.log(quizId);
    this.selectedQuizInfo.next(quizId);
  }

}
