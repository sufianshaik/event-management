import { Component, OnInit } from '@angular/core';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { fadeInItems } from '@angular/material/menu';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
    constructor(public _eventService : EventsDetailsService,
      public _userLoginService : UserLoginDetailsService,
      private _fb : FormBuilder
      ){}
    searchBarForm !: FormGroup ;
    allEventsList! : any[] ;
    categoriesList : string[] = [] ;
    locationList : string[] = [];
    groupedEvents :  Map<string, IEventDetails[]> = new Map(); 
    filteredGroupedEvents !: any[]; 
    customOptions: OwlOptions = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      responsiveRefreshRate : 1,
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
          items: 3,
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
      this.searchBarForm = this._fb.group({
        eventType : "",
        cityType : "",
        categoryType : "",
      });

      // search filter on the event cards
      this.searchBarForm?.valueChanges.subscribe({
        next : item =>{
          this.filterEventCards(item.eventType,item.cityType,item.categoryType);
          console.log(this.filteredGroupedEvents);
          this.groupedEvents = new Map();
          this.getGroupedList();
        },
        error : err =>{
          console.log(err);
        }
      });


      // to get all the categories 
      this._eventService.getAllCategoriesInEvents().subscribe({
        next : item => {
          this.categoriesList = item;
        },
        error : err => {
          console.log(err);
        }
      });


      // to get all the locations
      this._eventService.getAllLocationsInEvents().subscribe({
        next : item =>{
          this.locationList = item ;
        },
        error : err =>{
          console.log(err);
        }
      })

      // to get all the events details with out any filter
      this._eventService.getAllEventsDetails().subscribe({
        next : item => {        
          this.allEventsList = item ;
          this.filteredGroupedEvents = item;
          this.getGroupedList();
        },
        error : err => {
          console.log(err);
        }
      });
    }
}
