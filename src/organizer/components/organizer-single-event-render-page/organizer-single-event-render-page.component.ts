import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';

@Component({
  selector: 'app-organizer-single-event-render-page',
  templateUrl: './organizer-single-event-render-page.component.html',
  styleUrls: ['./organizer-single-event-render-page.component.css']
})
export class OrganizerSingleEventRenderPageComponent implements OnInit{
  eventId : string | any = "" ;
  startDate! : string ; 
  endDate !: string ;
  eventDetails! : IEventDetails ;
  email! : string ;
  isBooked! : boolean;
  isEventCompleted ! : boolean ; 

  getOrganizerDetails(userId : string) {
    this._userLoginService.getUserDetailsByUserId(userId)?.subscribe({
      next : item => {
        this.email = item.email ;
      },
      error : err => {
        console.log("From getOrganizerDetails" + err) ;
      }
    })
  }

  

  constructor(private route : ActivatedRoute,
    private _eventService : EventsDetailsService,
    private _location : Location,
    private _router : Router,
    private _userLoginService : UserLoginDetailsService,
    private _toaster : ToastrService,
    private dialog : MatDialog ){}
    ngOnInit(): void {

      const currentDate = new Date().getTime();
      this.isEventCompleted = false ;
      this.eventId = this.route.snapshot.paramMap.get('eventId') ;
      this._eventService.getEventByEventId(this.eventId).subscribe({
        next : item => {       
          this.eventDetails = item ;
          this.isBooked = false ;
          var checkUserId : string = this._userLoginService.userId;
          if (item.endTimeAndDate * 1000 < currentDate){
            this.isEventCompleted = true ;
          }
          // console.log(item.endTimeAndDate * 1000 , currentDate);
          for( var i = 0 ; i < this.eventDetails.participatedBy?.length ; i ++){
            var id = this.eventDetails.participatedBy[i];
            if (id.userId == checkUserId ) {
              this.isBooked = true ;
              break ;
            }
          }
          console.log(item);
          this.getOrganizerDetails(item.createdBy);
          this.startDate = new Date(item.startTimeAndDate * 1000).toDateString();
          this.endDate = new Date(item.endTimeAndDate * 1000).toDateString();
        },
        error : err => {
          console.log("from get event by id" + err);
        }
      });   
    }

    goBack() : void {
      this._location.back();
    }
}
