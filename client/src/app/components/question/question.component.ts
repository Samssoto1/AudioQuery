import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private httpService: HttpService, public dialog: MatDialog, private router: Router, private questionService: QuestionService) { }
  @Input() question;

  ngOnInit(): void {
  }

  onDelete(questionId: string){
    // confirm delete
    let dialogRef = this.dialog.open(DeleteComponent, {data: {type: "question"}});
    dialogRef.afterClosed().subscribe(
      result => {
        // result tells us whether the user selected yes or no
        // if result = true, delete quiz from db
        if(result==true){
          // delete quiz
          this.httpService.delete("quizQuestion", questionId).subscribe( res => {

          })

        // Use a Subject to reload 
        this.questionService.updateQuestionList(questionId);
        }
      }
      )
  }

  onEdit(questionId: string){

  }

  onDuplicate(questionId: string){

  }

  navigateToQuestion(questionId: string){
    this.router.navigate(["/quiz/edit-a-quiz-question", questionId]);
  }

}
