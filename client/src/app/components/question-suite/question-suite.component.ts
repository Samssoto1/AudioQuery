import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-question-suite',
  templateUrl: './question-suite.component.html',
  styleUrls: ['./question-suite.component.css']
})
export class QuestionSuiteComponent implements OnInit {
  questionSuiteForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this.questionSuiteForm = this.fb.group({
      song: '',
      questionContent: this.fb.group({
        answers: [],
        correctAnswer: '',
      })
    })
  }

  onSubmit(): void{
    console.log(this.questionSuiteForm);
  }



}
