import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-quiz',
  templateUrl: './delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.css']
})
export class DeleteQuizComponent implements OnInit {
  canDelete: boolean;

  constructor(private matDialogRef: MatDialogRef<DeleteQuizComponent>) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.matDialogRef.close(this.canDelete);
  }

}
