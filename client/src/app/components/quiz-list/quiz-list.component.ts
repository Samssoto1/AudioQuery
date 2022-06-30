import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  @Input() list_of_quizzes;
  @Input() userId;
  // isLoading;

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    console.log(this.userId);

    this.httpService.get("quizzesForUser", this.userId).subscribe((data) => {
      console.log(data);
      this.list_of_quizzes = data;
      // this.list_of_quizzes = data[];
    });
  }

  createAQuiz(){
    this.router.navigate(['/quiz/create-a-quiz'])
  }

}
