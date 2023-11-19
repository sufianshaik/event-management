import { Component, OnInit } from '@angular/core';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { FeedbackService } from 'src/shared/services/feedBackRelated/feedback.service';


@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.css']
})
export class OrganizerEventsComponent implements OnInit{
  constructor(private _eventService : EventsDetailsService,
              public _userLoginService : UserLoginDetailsService,
              private _feedbackService : FeedbackService){}
  allEventsList : IEventDetails[] = [];
  categoriesList : string[] = [] ; 
  groupedEvents :  Map<string, IEventDetails[]> = new Map(); 
  filteredGroupedEvents !: any[]; 
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class = "fa fa-caret-left"></i>', '<i class = "fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  filterEventCards(eventType : string , eventCity : string, eventCategory : string){ 
    eventType = eventType.toLowerCase();
    eventCity = eventCity.toLowerCase();
    eventCategory = eventCategory.toLowerCase();
    this.filteredGroupedEvents = this.allEventsList.filter((item) => {
      return (item.location.toLowerCase().includes(eventCity)
        && (item.category.toLowerCase().includes(eventCategory))
      );
    });
  }

   getGroupedList() : void {
      from(this.filteredGroupedEvents)
        .pipe(
          groupBy(event => event.category.toLowerCase()),
          mergeMap(group => group.pipe(toArray())),
          map(groups => ({ category: groups[0].category, events: groups }))
        )
        .subscribe(group => {
          const category = group.category;
          const events = group.events;
          if (this.groupedEvents.has(category)) {
            this.groupedEvents.get(category)?.push(...events);
        } else {
            this.groupedEvents.set(category, events);
        }
         })
    }

  ngOnInit(): void {
    this._eventService.getEventByCreatedByIdAndCategory(this._userLoginService.userId).subscribe({
      next : item => {
        this.categoriesList = [...new Set(item)] as string[];
      },
      error : err => {
        console.log(err);
      }
    });

    this._eventService.getEventByCreatedById(this._userLoginService.userId).subscribe({
      next : item  => {
        this.allEventsList = item ;
        this.filteredGroupedEvents = item;
        this.getGroupedList();
        // this._feedbackService.groupedEvents = this.groupedEvents ;
        
      },
      error : err => console.log(err) 
    });
  }



}
