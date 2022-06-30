import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-a-quiz',
  templateUrl: './create-a-quiz.component.html',
  styleUrls: ['./create-a-quiz.component.css']
})
export class CreateAQuizComponent implements OnInit {
  @ViewChild('f') createAQuizForm: NgForm;
  quizMode: string = "new";
  

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCreateQuizSubmit(){
    if(this.createAQuizForm.valid){
      // Get username from token - localStorage
      const author = this.authService.getUsername();
      // Get user ID from token - localStorage
      const authorId = this.authService.getId();

      const title = this.createAQuizForm.value.quizTitle

      const description = this.createAQuizForm.value.quizDescription;
      
      console.log(this.createAQuizForm);
      
      // create a new quiz object
      this.httpService.post('create-a-quiz', {
        title: title,
        description: description,
        author: author,
        authorId: authorId
      }
      ).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/quiz/create-a-quiz-question", data['_id']], { relativeTo: this.activatedRoute })
        }
      );

    }
  }

}
