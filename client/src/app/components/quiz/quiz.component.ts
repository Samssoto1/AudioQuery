import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DeleteQuizComponent } from '../dialog/delete-quiz/delete-quiz.component';
import {MatDialog} from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quiz;

  constructor(public dialog: MatDialog, private httpService: HttpService, private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    console.log(this.quiz);
  }

  onDelete(quizId: string){
    // confirm delete
    let dialogRef = this.dialog.open(DeleteQuizComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        // result tells us whether the user selected yes or no
        // if result = true, delete quiz from db
        if(result==true){
          // delete quiz
          this.httpService.delete("quiz", quizId).subscribe( res => {
          })
          // must also delete all questions that have the same quizId
          //....
          this.httpService.delete("allQuizQuestions", quizId).subscribe( res => {

          })

        // Use a Subject to reload 
        this.quizService.updateQuizList(quizId);
        }
      }
      )
  }

  onEdit(quizId: string){
    this.router.navigate(['/quiz/dashboard', quizId]);
  }

  onChanges(){
    {{}}
  }

}
