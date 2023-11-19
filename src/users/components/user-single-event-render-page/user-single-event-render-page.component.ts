import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { Location } from '@angular/common';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { debounceTime } from 'rxjs';
import { IParticipated } from 'src/shared/models/ParticipatedUsersDetails';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UsersEventsFeedbackComponent } from '../users-events-feedback/users-events-feedback.component';
import { IfeedBack } from 'src/shared/models/FeedBack';



@Component({
  selector: 'app-user-single-event-render-page',
  templateUrl: './user-single-event-render-page.component.html',
  styleUrls: ['./user-single-event-render-page.component.css']
})


export class UserSingleEventRenderPageComponent implements OnInit {
  eventId : string | any = "" ;
  startDate! : string ; 
  endDate !: string ;
  eventDetails! : IEventDetails ;
  email! : string ;
  isBooked! : boolean;
  isEventCompleted ! : boolean ; 
  

  goBack() : void {
    this._location.back();
  }

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

  getEventDetails(): void {
    this._eventService.getEventByEventId(this.eventId)?.subscribe({
      next : item => {       
        this.eventDetails = item ;
        this.getOrganizerDetails(item.createdBy);
        this.startDate = new Date(item.startTimeAndDate * 1000).toDateString();
        this.endDate = new Date(item.endTimeAndDate * 1000).toDateString();
      },
      error : err => {
        console.log(" from getEventDetails" + err);
      }
    });
  }


  BookEvent() : void {
    var index : number = -1 ;
    var checkUserId : string = this._userLoginService.userId;
    for( var i = 0 ; i < this.eventDetails.participatedBy?.length ; i ++){
      var id = this.eventDetails.participatedBy[i];
      if (id[0] == checkUserId ) {
        index = i ;
        break ;
      }
    } 
    if (!this._userLoginService.isLogin){
      this._toaster.warning("please login to Register to Event")
      this._router.navigate(['/signin']);
    }
    else if(index == -1) {
      var obj : IParticipated = <IParticipated>{};
      obj.userId = this._userLoginService.userId;
      obj.email = this._userLoginService.email;
      this.eventDetails.participatedBy?.push(obj);  
      this._eventService.addUserToParticipatedListOfEvent(this.eventDetails)?.subscribe({
        next : item => {
          // alert('succesfully registered to the Event..');
          this._toaster.success("Yaay !!" ,"succesfully registered to the event")
          this.isBooked = true; 
          this.getEventDetails();
        },  
        error : err => {  
          console.log("from book event" + err) ;
        } 
      });
    }
    else {
      this._toaster.show("event already added", ":)") ;
    }
  }

  unBookEvent() : void {
    var index : number = -1 ;
    var checkUserId : string = this._userLoginService.userId;
    for( var i = 0 ; i < this.eventDetails.participatedBy?.length ; i ++){
      var id = this.eventDetails.participatedBy[i];
      if (id.userId == checkUserId ) {
        index = i ;
        break ;
      }
    }
    if (index != -1) {
      this.eventDetails.participatedBy?.splice(index, 1);
    }
    this._eventService.addUserToParticipatedListOfEvent(this.eventDetails).subscribe({
      next : item => {
        // alert('unregistered from the event : (');
        this._toaster.warning("unregisterd From the event" , ":(");
        this.isBooked = false ;
        this.isEventCompleted = false ; 
        this.getEventDetails();
      },  
      error : err => {  
        console.log("from unbook event " + err) ;
      } 
    })
  }

  eventFeedback() : void {
    const dialogRef = this.dialog.open(UsersEventsFeedbackComponent, {
      minWidth : "50vh",
      minHeight : "50vh",
      enterAnimationDuration : '300ms',
      exitAnimationDuration : '300ms',
      data : "",
    });
    dialogRef.afterClosed().subscribe(result =>{
       console.log(result);
       const newFeedBackObj : IfeedBack = <IfeedBack> {} ;
       newFeedBackObj.feedBackMessage = result.feedBackMesg;
       newFeedBackObj.userId = this._userLoginService.userId;
       newFeedBackObj.email = this._userLoginService.email ;

       var index : number = -1 ;
       var checkUserId : string = this._userLoginService.userId;
       for( var i = 0 ; i < this.eventDetails.feedBackMessagesList?.length ; i ++){
         var id = this.eventDetails.feedBackMessagesList[i];
         if (id.userId == checkUserId ) {
           index = i ;
           break ;
         }
       }
       if( index == -1 && result.feedBackMesg.length > 0 ){
          this.eventDetails.feedBackMessagesList?.push(newFeedBackObj);  
          this._eventService.addUserToParticipatedListOfEvent(this.eventDetails)?.subscribe({
            next : item => {
              this._toaster.success("Yaay !!" ,"feedback added succesfully")
              this.isBooked = true ; 
              this.getEventDetails();
            },  
            error : err => {  
              console.log("from book event" + err) ;
            } 
          });
        }
        else{
          if(index != -1 && result.feedBackMesg.length == 0 ){
            this._toaster.warning(":) ","please give some feedback") ;
          }
          this._toaster.warning(":) ","feedback already submitted") ;
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
        // if (this.eventDetails.participatedBy?.includes(this._userLoginService.userId)){
        //   this.isBooked = true ;
        // }
        this.getOrganizerDetails(item.createdBy);
        this.startDate = new Date(item.startTimeAndDate * 1000).toDateString();
        this.endDate = new Date(item.endTimeAndDate * 1000).toDateString();
      },
      error : err => {
        console.log("from get event by id" + err);
      }
    });   
  }
} 
