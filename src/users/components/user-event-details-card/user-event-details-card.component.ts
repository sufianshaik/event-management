import { Component, OnInit, Input } from '@angular/core';
import { IEventDetails } from 'src/shared/models/EventDetails';

@Component({
  selector: 'app-user-event-details-card',
  templateUrl: './user-event-details-card.component.html',
  styleUrls: ['./user-event-details-card.component.css']
})
export class UserEventDetailsCardComponent implements OnInit  {
  constructor(){}
  startDate! : string;
  endDate ! : string ;
  @Input() eventDetails! : IEventDetails ;

  ngOnInit(): void {
      this.startDate = new Date(this.eventDetails.startTimeAndDate * 1000 ).toDateString();
      this.endDate = new Date(this.eventDetails.endTimeAndDate * 1000).toDateString();
  }

}
