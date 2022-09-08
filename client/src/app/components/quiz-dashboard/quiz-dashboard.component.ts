import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { QuestionService } from 'src/app/services/question.service';
import { Subscription, take, concatMap, tap} from 'rxjs';

// Models
import { dashInfo } from '../../model/dashInfo.model';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit, OnDestroy {

  subscriptions
  subscriptionInit: Subscription

  quizId: string;
  quizTitle: string;
  questionInfo
  questionServiceSubscription: Subscription
  songList;

  dashInfo: dashInfo;

  constructor(private questionService: QuestionService, public dialog: MatDialog, private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    // Subscription for necessary data upon init
    this.subscriptionInit = this.activatedRoute.paramMap.pipe( // get quizId from parameters
      tap(res => this.quizId = res['params']['quizId']),
      concatMap(res => this.httpService.get('getQuizById', this.quizId)),
      tap(res => this.quizTitle = res['title']),
      concatMap(res => this.httpService.get('getAllSongs', '')),  
      tap(res => 
          {
            this.songList = res
            this.songList.sort((a, b) =>
            a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );
        })
      ).subscribe(response => {
      this.getQuestions();
    
      // Subscribe in case user wants to delete quiz. Deletes subscription on leaving component.
        this.questionServiceSubscription = this.questionService.updateQList.subscribe(() => {
          this.getQuestions();
        })
    });
}

  getQuestions(){
    this.httpService.get('quizQuestions', this.quizId).pipe(take(1)).subscribe(
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
    this.subscriptionInit.unsubscribe();
    this.questionServiceSubscription.unsubscribe()
  }
}


