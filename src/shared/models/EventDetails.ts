export interface IEventDetails {
    eventId? : String,
    location : string,
    description : string,
    category : string,
    participatedBy : any[],
    createdBy? : string ,
    capacity : number,
    eventFareAmount : number,
    eventName : string,
    eventVenue : string,
    startTimeAndDate : number,
    endTimeAndDate : number,
    feedBackMessagesList: [
        {
         userId : string ,
         feedBackMessage : string ,
         email : string 
        }
    ]
}