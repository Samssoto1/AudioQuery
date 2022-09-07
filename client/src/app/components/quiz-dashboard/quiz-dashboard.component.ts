import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { QuestionService } from 'src/app/services/question.service';
import { Subscription, take, concatMap } from 'rxjs';

// Models
import { dashInfo } from '../../model/dashInfo.model';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit, OnDestroy {
  quizId: string;
  quizTitle: string;
  questionInfo
  questionServiceSubscription: Subscription
  songList;

  dashInfo: dashInfo;






  constructor(private questionService: QuestionService, public dialog: MatDialog, private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Check if user is the author. If so, allow, else, errormsg.




    // get quiz title

    // get quiz info
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.quizId = params['params']['quizId'];

      this.httpService.get('getQuizById', this.quizId).subscribe((data) => {
        this.quizTitle = data['title'];
        })

      this.getQuestions()

      // Subscribe in case user wants to delete quiz. Deletes subscription on leaving component.
      this.questionServiceSubscription = this.questionService.updateQList.subscribe(() => {
        this.getQuestions();
      })

    });
  }

  getQuestions(){
    this.httpService.get('quizQuestions', this.quizId).subscribe(
      (data) => {
        console.log(data);
        this.questionInfo = data;
      }
    );
  }

  navigateToQuestion(questionId: string){
    this.router.navigate(["/quiz/edit-a-quiz-question", questionId]);
  }

  newQuestion(quizId: string){
    console.log(quizId);
    this.router.navigate(["/quiz/create-a-quiz-question", quizId])
  }

  ngOnDestroy(): void {
    this.questionServiceSubscription.unsubscribe()
  }
}


