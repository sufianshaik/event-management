import { Component, OnInit } from '@angular/core';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { from, groupBy, map, mergeMap, toArray } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-events-view-more-page',
  templateUrl: './users-events-view-more-page.component.html',
  styleUrls: ['./users-events-view-more-page.component.css']
})
export class UsersEventsViewMorePageComponent implements OnInit {
  constructor(public _eventService : EventsDetailsService,
    public _userLoginService : UserLoginDetailsService,
    private _route : ActivatedRoute,
    private _fb : FormBuilder
    ){}

  
  perPage : number = 10;
  totalPages : number = 20 ;

  category : string = "" ;
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

  filterEventCards(eventType : string , eventCity : string){ 
    eventType = eventType.toLowerCase();
    eventCity = eventCity.toLowerCase();
    this.filteredGroupedEvents = this.allEventsList.filter((item) => {
      return (item.location.toLowerCase().includes(eventCity)
        && (item.category.toLowerCase().includes(this.category.toLowerCase()))
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
    });

    // to get all cat
    this._eventService.getAllCategoriesInEvents().subscribe({
      next : item => {
        this.categoriesList = item;
      },
      error : err => {
        console.log(err);
      }
    });

    // to get all locations
    this._eventService.getAllLocationsInEvents().subscribe({
      next : item =>{
        this.locationList = item ;
      },
      error : err =>{
        console.log(err);
      }
    })


    // search filter on the event cards
    this.searchBarForm?.valueChanges.subscribe({
      next : item =>{
        this.filterEventCards(item.eventType,item.cityType);
        
        this.groupedEvents = new Map();
        this.getGroupedList();
      },
      error : err =>{
        console.log(err);
      }
    });

    this.category = this._route.snapshot.paramMap.get('category') || "";
    this._eventService.getAllEventsDetails().subscribe({
      next : item => {        
        this.allEventsList = item ;
        this.filteredGroupedEvents = item.filter((event : IEventDetails) =>{
          return event.category.toLowerCase() == this.category.toLowerCase();
        });
        this.totalPages = this.filteredGroupedEvents.length ;
        this.getGroupedList();
      },
      error : err => {
        console.log(err);
      }
    });
  }

}
