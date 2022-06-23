import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-create-a-quiz',
  templateUrl: './create-quiz-questions.component.html',
  styleUrls: ['./create-quiz-questions.component.css']
})
export class CreateQuizQuestionsComponent implements OnInit {
  @ViewChild('f') createAQuizQuestionForm: NgForm;
  list_of_quiz_questions: Array<Question> = []
  

  constructor(private httpService: HttpService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCreateQuizQuestion(){
    if(this.createAQuizQuestionForm.valid){

      // const author = this.authService.getUsername();

      // const authorId = this.authService.getId();

      // const title = this.createAQuizQuestionForm.value.quizTitle
      // console.log(title)

      // const description = this.createAQuizQuestionForm.value.quizDescription;
      // console.log(description);
      
      console.log(this.createAQuizQuestionForm);
      
      // create a new quiz object
      this.httpService.post('create-a-quiz-question', {
        // title: title,
        // description: description,
        // author: author,
        // authorId: authorId
      }
      ).subscribe();
      console.log('quiz thing')

    }
  }

}
