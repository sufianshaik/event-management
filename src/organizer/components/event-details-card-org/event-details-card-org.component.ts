import { Component, Input, OnInit} from '@angular/core';
import { IEventDetails } from 'src/shared/models/EventDetails';

@Component({
  selector: 'app-event-details-card-org',
  templateUrl: './event-details-card-org.component.html',
  styleUrls: ['./event-details-card-org.component.css']
})
export class EventDetailsCardOrgComponent implements OnInit{
  @Input() eventDetails! : any ;  

  ngOnInit(): void {
    
  }
}
