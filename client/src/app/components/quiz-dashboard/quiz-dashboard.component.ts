import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit {
  quizId: string;
  quizTitle: string;
  questionInfo


  constructor(private httpService: HttpService, private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // get quiz title

    // get quiz info
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.quizId = params['params']['quizId'];

      this.httpService.get('getQuizById', this.quizId).subscribe((data) => {
         this.quizTitle = data['title'];
         })

      this.httpService.get('quizQuestions', this.quizId).subscribe(
        (data) => {
          console.log(data);
          this.questionInfo = data;
        }
      );

    });
  }

}
