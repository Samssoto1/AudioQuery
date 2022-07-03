import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  updateQList = new Subject<boolean>();

  updateQuizList(quizId){
    // theres really no need for quizId but I need to send something to use next and subscribe...
    this.updateQList.next(quizId)
  }

  constructor() { }
}
