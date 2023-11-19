import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable , catchError, throwError} from 'rxjs'
import { IEventDetails } from 'src/shared/models/EventDetails';
import { IUser} from 'src/shared/models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserLoginDetailsService {
  constructor(private _http : HttpClient) { }
  // Role : string = "";
  // isLogin : boolean = false ;
  // userId! : string ;
  // email : string = "";
  Role : string = JSON.parse(window.localStorage.getItem('ROLE') || "" ) ; 
  isLogin : boolean = JSON.parse(window.localStorage.getItem('isLogin') || 'false');
  userId : string = JSON.parse(window.localStorage.getItem('userId') || "");
  email : string = JSON.parse(window.localStorage.getItem("email") || "");
  userDetails : IUser  = <IUser>{} ; 
  testingUserDetailsForSample : IEventDetails = <IEventDetails> <unknown>{
    eventId: "654d7ff08bdafc0d776c0e33",
    location: "delhi",
    description: "sample data being pushed from the req.http file",
    category: "event",
    participatedBy: [],
    createdBy: "6549cf08d138e214c6145775",
    capacity: 25,
    eventFareAmount: 0,
    eventName: "cbi",
    eventVenue: "itcd",
    startTimeAndDate: 1699353489,
    endTimeAndDate: 1699353499
  };  

  get loginStatus() : boolean{ 
    return this.isLogin;
  }

  set loginStatus( status : boolean) {
    this.isLogin = status; 
  }

  public get typeOfRole() : string { 
    return this.Role;
  }

  public set typeOfRole(role : String | any ){ 
    this.Role = role ;
  }

  signupUrl = "http://localhost:8080/users/signup";
  loginUrl = "http://localhost:8080/users/login";
  addNewUser(user : IUser): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', "application/json");
    return this._http.post(this.signupUrl, user, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  emailGetUrl = "http://localhost:8080/users/user/"
  getUserDetailsByEmail(email : string) : Observable<any> {
    return this._http.get(this.emailGetUrl + email).pipe(
      catchError(this.handleError)
    )
  }
  // used for the login checking of the user 
  loginUserCheck(user : any) : Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', "application/json");
    return this._http.post(this.loginUrl , user, {headers}).pipe(
      catchError(this.handleError)
    );
  }
  
  getUserDetailsByUserIdURL = "http://localhost:8080/users/"
  getUserDetailsByUserId(userId : string | any ) : Observable<any>{
    return this._http.get(this.getUserDetailsByUserIdURL+ userId).pipe(
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
