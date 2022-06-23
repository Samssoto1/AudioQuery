import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-a-quiz',
  templateUrl: './create-a-quiz.component.html',
  styleUrls: ['./create-a-quiz.component.css']
})
export class CreateAQuizComponent implements OnInit {
  @ViewChild('f') createAQuizForm: NgForm;
  quizMode: string = "new";
  

  constructor(private httpService: HttpService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCreateQuizSubmit(){
    if(this.createAQuizForm.valid){
      // Get username from token - localStorage
      const author = this.authService.getUsername();
      // Get user ID from token - localStorage
      const authorId = this.authService.getId();

      const title = this.createAQuizForm.value.quizTitle
      console.log(title)

      const description = this.createAQuizForm.value.quizDescription;
      console.log(description);
      
      console.log(this.createAQuizForm);
      
      // create a new quiz object
      this.httpService.post('create-a-quiz', {
        title: title,
        description: description,
        author: author,
        authorId: authorId
      }
      ).subscribe();
      console.log('quiz thing')

    }
  }

}
