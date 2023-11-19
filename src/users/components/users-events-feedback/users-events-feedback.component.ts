import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-users-events-feedback',
  templateUrl: './users-events-feedback.component.html',
  styleUrls: ['./users-events-feedback.component.css']
})
export class UsersEventsFeedbackComponent implements OnInit {
  feedbackForm !: FormGroup;
  constructor(private _fb : FormBuilder,
    private dialogRef: MatDialogRef<UsersEventsFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,){}


  addEventFeedBack(){
    this.dialogRef.close(this.feedbackForm.value) ;
  }

  ngOnInit(): void {
    this.feedbackForm = this._fb.group({
      feedBackMesg : ["", Validators.required]
    })
  }

}
