import { Component,OnInit } from '@angular/core';
import { from, groupBy, mergeMap, toArray, map } from 'rxjs';
import { IEventDetails } from 'src/shared/models/EventDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { EventsDetailsService } from 'src/shared/services/eventRelated/events-details.service';
import { FeedbackService } from 'src/shared/services/feedBackRelated/feedback.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {IeventNode} from 'src/shared/models/matTree'
 
@Component({
  selector: 'app-organizer-messages',
  templateUrl: './organizer-messages.component.html',
  styleUrls: ['./organizer-messages.component.css']
})


export class OrganizerMessagesComponent implements OnInit {


  constructor(private _eventService : EventsDetailsService,
    public _userLoginService : UserLoginDetailsService, 
    private _feedbackService : FeedbackService){}

    eventsCreatedByOrganizer : IEventDetails[] = [];
    categoriesList : string[] = [] ; 
    groupedEvents :  Map<string, IEventDetails[]> = new Map(); 

    treeControl = new NestedTreeControl<IeventNode>(node => node.children);
    dataSource  = new MatTreeNestedDataSource<IeventNode>();

    feedbackList : any[] = [];

    getGroupedList() : void {
      from(this.eventsCreatedByOrganizer)
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

    temp : IeventNode[] =  [
      {
        name: 'Fruit',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
      }
    ] ;

    ngOnInit(): void {
      this.dataSource.data = this.temp ;
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
          this.eventsCreatedByOrganizer = item ;
          this.getGroupedList(); 
          
          this._feedbackService.groupedEvents = this.groupedEvents ;
        },
        error : err => console.log(err) 
      });

    }
    hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

}
