import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserEventDetailsCardComponent } from './components/user-event-details-card/user-event-details-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSingleEventRenderPageComponent } from './components/user-single-event-render-page/user-single-event-render-page.component';
import { UserMyEventsComponent } from './components/user-my-events/user-my-events.component';
import { UserRenderComponent } from './components/user-render/user-render.component';
import { FullCalendarModule} from '@fullcalendar/angular';
import { EventCompletedButtonUserComponent } from './components/event-completed-button-user/event-completed-button-user.component';
import { UsersEventsFeedbackComponent } from './components/users-events-feedback/users-events-feedback.component';
import { UsersEventsViewMorePageComponent } from './components/users-events-view-more-page/users-events-view-more-page.component';






@NgModule({
  declarations: [
    UserDashboardComponent,
    UserEventDetailsCardComponent,
    UserSingleEventRenderPageComponent,
    UserMyEventsComponent,
    UserRenderComponent,
    EventCompletedButtonUserComponent,
    UsersEventsFeedbackComponent,
    UsersEventsViewMorePageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPaginationModule,
    CarouselModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers : [

  ],
  exports : [

  ]
})
export class UsersModule { }
