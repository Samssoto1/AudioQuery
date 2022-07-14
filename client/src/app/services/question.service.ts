import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  updateQList = new Subject();

  constructor() { }

  updateQuestionList(questionId: string){
    // Not using sent questionId.. just refreshing list
    this.updateQList.next(questionId);
  }
}
