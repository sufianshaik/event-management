import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from 'src/users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEventComponent } from './components/add-event/add-event.component';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { OrganizerSidebarComponent } from './components/organizer-sidebar/organizer-sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OrganizerEventsComponent } from './components/organizer-events/organizer-events.component';
import { EventDetailsCardOrgComponent } from './components/event-details-card-org/event-details-card-org.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipesModule } from 'src/pipes/pipes.module';
import { OrganizerMessagesComponent } from './components/organizer-messages/organizer-messages.component';
import { OrganizerProfileComponent } from './components/organizer-profile/organizer-profile.component';
import { ShareSocialIconsComponent } from './components/share-social-icons/share-social-icons.component';
import { FeedbackEventNameComponent } from './components/feedbacks/feedback-event-name/feedback-event-name.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OrganizerSingleEventRenderPageComponent } from './components/organizer-single-event-render-page/organizer-single-event-render-page.component';




@NgModule({
  declarations: [
    AddEventComponent,
    OrganizerDashboardComponent,
    OrganizerSidebarComponent,
    OrganizerEventsComponent,
    EventDetailsCardOrgComponent,
    OrganizerMessagesComponent,
    OrganizerProfileComponent,
    ShareSocialIconsComponent,
    FeedbackEventNameComponent,
    OrganizerSingleEventRenderPageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UsersModule,
    PipesModule,
    ReactiveFormsModule,
    CarouselModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  exports : [
    AddEventComponent,
  ]
})
export class OrganizerModule { }
