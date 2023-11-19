import { Injectable } from '@angular/core';
import { IEventDetails } from 'src/shared/models/EventDetails';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  groupedEvents :  Map<string, IEventDetails[]> = new Map(); 
  constructor() { }
}
