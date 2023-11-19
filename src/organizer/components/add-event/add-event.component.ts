import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es'
import { IEventDetails } from 'src/shared/models/EventDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit { 
  newEvent! : FormGroup;

  public stringsToDisplay : any = {
    location  : "",
    description : "",
    category : "",
    participatedBy : [],
    createdBy : "",
    capacity : "",
    eventFareAmount : 0 ,
    eventName : "" ,
    eventVenue : "",
    startTimeAndDate: 0,
    endTimeAndDate : 0,
    startDateMessage : "",

  }

  private validationMessages : any  = { 
    eventName : {
      required : 'please enter the event title' ,
    },
    eventVenue : {
      required : "please enter the event venue",
    },
    category : {
      required : "category is required", 
    },
    description : {
      required : "please enter the desciption", 
    },
    location : {
      required : "please enter the desciption", 
    },
    capacity : {
      required : "capacity is required*", 
    },
    eventFareAmount : {
      required : "capacity is required*", 
    },
    endTimeAndDate : {
      required : "capacity is required*", 
    },
    startTimeAndDate : {
      required : "capacity is required*", 
    },
    max : { 
      match : "Email doesn't Match",
    }
  }


  addNewEvent(newEvent : IEventDetails) : void {
    this._eventService.addNewEventByOrganizer(newEvent).subscribe({
      next : item =>{ 
        if (item.statusType == "CREATED") {
          alert('new event added succesfully');
          this._router.navigate(['organizer/events']);
        }
        else {
          alert('event not added :(');
        }
      },
      error : err => {
        console.log(err);
      }
    })
  }

  onSubmit() : void {
    const startUNIX = dayjs(this.newEvent.value.startTimeAndDate).unix();
    const endUNIX = dayjs(this.newEvent.value.endTimeAndDate).unix();
    const newEvent : IEventDetails = <IEventDetails>{};
    const formData = this.newEvent.value ;
    newEvent.capacity = formData.capacity ;
    newEvent.location = formData.location ;
    newEvent.description = formData.description ;
    newEvent.category = formData.category ;
    newEvent.participatedBy = [] ;
    newEvent.createdBy = this._userLoginService.userId;
    newEvent.capacity = formData.capacity ;
    newEvent.eventFareAmount = formData.eventFareAmount;
    newEvent.eventName = formData.eventName ; 
    newEvent.eventVenue = formData.eventVenue ; 
    newEvent.startTimeAndDate = startUNIX
    newEvent.endTimeAndDate = endUNIX ;
    this.addNewEvent(newEvent);
  }


  constructor(private _fb : FormBuilder,
         private _userLoginService : UserLoginDetailsService,
         private _eventService : EventsDetailsService,
         private _router : Router){}
  ngOnInit(): void {
    this.newEvent = this._fb.group({
      eventName : ['', [Validators.required]],
      eventVenue : ['', [Validators.required]],
      location  : ['' , [Validators.required]],
      description : ['' , [Validators.required]],
      category : ['' , [Validators.required]],
      capacity : ['' , [Validators.required]],
      eventFareAmount : [0 , [Validators.required]] ,
      startTimeAndDate: [0 , [Validators.required]],
      endTimeAndDate : [0,[Validators.required]],
    })
  }
}
