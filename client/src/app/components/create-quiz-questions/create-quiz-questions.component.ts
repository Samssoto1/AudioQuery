import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/model/question.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-create-a-quiz',
  templateUrl: './create-quiz-questions.component.html',
  styleUrls: ['./create-quiz-questions.component.css']
})
export class CreateQuizQuestionsComponent implements OnInit {
  @ViewChild('f') createAQuizQuestionForm: NgForm;
  quizId: string;
  list_of_songs;
  selectedSongData;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router,private activatedRoute: ActivatedRoute ) { }

  getSelectedSongData(selectedSongData){
    this.selectedSongData = selectedSongData;
    console.log(this.selectedSongData);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.quizId = params['params']['quizId'];
    });
  }

  onCreateQuizQuestion(){
    if(this.createAQuizQuestionForm.valid && this.selectedSongData != undefined){
      
      console.log(this.createAQuizQuestionForm);
      console.log(this.selectedSongData)
      console.log(this.selectedSongData['_id'])

      this.httpService.post('create-a-question', {
        // questionTitle: this.createAQuizQuestionForm.value.questionTitle, 
        answerOne: this.createAQuizQuestionForm.value.answerOne,
        answerTwo: this.createAQuizQuestionForm.value.answerTwo,
        answerThree: this.createAQuizQuestionForm.value.answerThree,
        answerFour: this.createAQuizQuestionForm.value.answerFour,
        correctAnswer: this.createAQuizQuestionForm.value.correctAnswer,
        quizId: this.quizId,
        songId: this.selectedSongData['_id'],
        songTitle: this.selectedSongData['title']
      }).subscribe(
        (data) => {

          this.router.navigate(['/quiz/dashboard', this.quizId]);
        }
      )
    }
  }

}
