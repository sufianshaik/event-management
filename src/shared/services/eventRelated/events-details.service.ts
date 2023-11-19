import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError, throwError } from 'rxjs';
import { IEventDetails } from 'src/shared/models/EventDetails';

@Injectable({
  providedIn: 'root'
})
export class EventsDetailsService {

  constructor(private _http : HttpClient) { }

  // getting all events details 
  getAllEventsDetailsURL = "http://localhost:8080/events";
  getAllEventsDetails() : Observable<any> {
    return this._http.get(this.getAllEventsDetailsURL).pipe(
      catchError(this.handleError)
    );
  }


  // getting a particular event by its id 
  getEventByEventIddURL = "http://localhost:8080/events/event/"
  getEventByEventId(eventId : string ) : Observable<any> { 
    return this._http.get(this.getEventByEventIddURL + eventId).pipe(
      catchError(this.handleError)
    );
  }


  // getting all the categories present in the events 
  getAllCategoriesInEventsURL = "http://localhost:8080/events/categories" ;
  getAllCategoriesInEvents() : Observable<any> {
    return this._http.get(this.getAllCategoriesInEventsURL).pipe(
      catchError(this.handleError)
    );
  }

  // getting all the locations present in the events
  getAllLocationsInEventsURL = "http://localhost:8080/events/locations";
  getAllLocationsInEvents() : Observable<any>{
    return this._http.get(this.getAllLocationsInEventsURL).pipe(
      catchError(this.handleError)
    );
  }


  // get all the events by the created by id 
  getEventByCreatedByIdURL = "http://localhost:8080/events/organizer/"
  getEventByCreatedById(createdById: string ) : Observable<any> {
    return this._http.get(this.getEventByCreatedByIdURL + createdById).pipe(
      catchError(this.handleError)
    );
  }

  // get all the events created id and category combined 
  getEventByCreatedByIdAndCategoryURL = "http://localhost:8080/events/categories/"
  getEventByCreatedByIdAndCategory(createdById : string ) : Observable<any> {
    return this._http.get(this.getEventByCreatedByIdAndCategoryURL + createdById).pipe(
      catchError(this.handleError)
    )
  }

  // get all the events in which user have been participated 
  getAllEventsParticipatedByUserURL = "http://localhost:8080/events/contains/";
  getAllEventsParticipatedByUser(userId : string):  Observable<any>{
    return this._http.get(this.getAllEventsParticipatedByUserURL + userId).pipe(
      catchError(this.handleError)
    );
  }  

  // ADDING NEW EVENT
  addNewEventByOrganizerURL = "http://localhost:8080/events" ;
  addNewEventByOrganizer(newEvent : any) : Observable<any>{ 
    const headers = new HttpHeaders().set('Content-Type', "application/json");
    return this._http.post(this.addNewEventByOrganizerURL, newEvent , {headers}).pipe(
      catchError(this.handleError)
    );
  }

  // updating the event participated list 
  addUserToParticipatedListOfEventURL = "http://localhost:8080/events/";
  addUserToParticipatedListOfEvent(updatedEvent : IEventDetails) : Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', "application/json");
    return this._http.put(this.addUserToParticipatedListOfEventURL + updatedEvent.eventId , updatedEvent , {headers}).pipe(
      catchError(this.handleError)
    );
  }
  




  private handleError(err : HttpErrorResponse){
    let errorMessage = "" ;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured ${err.error.message}` ;
    } else {
        errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}` ;
    }
    console.log(errorMessage);
    return throwError(()=>errorMessage) ;
  }

}
