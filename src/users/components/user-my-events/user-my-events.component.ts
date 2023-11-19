import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { IEventDetails } from 'src/shared/models/EventDetails';



@Component({
  selector: 'app-user-my-events',
  templateUrl: './user-my-events.component.html',
  styleUrls: ['./user-my-events.component.css']
})
export class UserMyEventsComponent implements OnInit{
  Events : any[]= [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height : 'auto',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    defaultAllDay : true ,
    selectMirror: true,
    dayMaxEvents: true,
    events : [],
  };


  constructor(private _eventService : EventsDetailsService,
      private _userLogin : UserLoginDetailsService){}

  ngOnInit(): void {
    this._eventService.getAllEventsParticipatedByUser(this._userLogin.userId).subscribe({
      next : item => {
        console.log(item);
          item.forEach( (userEvent : IEventDetails)=> {
              this.Events.push(
                {
                  title : userEvent.eventName, 
                  start : new Date(userEvent.startTimeAndDate * 1000).toISOString().slice(0, 10), 
                  // end : new Date(userEvent.endTimeAndDate * 1000).toISOString().slice(0, 10), 
                  color : "#F26419",
                }
              )
          });
          this.calendarOptions.events = this.Events;
      },
      error : err => {
        console.log(err) ;
      }
    });

  }
}
