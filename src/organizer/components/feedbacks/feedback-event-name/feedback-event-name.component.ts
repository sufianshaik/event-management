import { Component, Input, OnInit } from '@angular/core';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { FeedbackService } from 'src/shared/services/feedBackRelated/feedback.service';

@Component({
  selector: 'app-feedback-event-name',
  templateUrl: './feedback-event-name.component.html',
  styleUrls: ['./feedback-event-name.component.css']
})
export class FeedbackEventNameComponent implements OnInit {
  groupedEvents :  Map<string, IEventDetails[]> = new Map(); 
  constructor(private _eventService : EventsDetailsService,
    public _userLoginService : UserLoginDetailsService, 
    private _feedbackService : FeedbackService){}
    
  ngOnInit(): void {
    
  }
}
