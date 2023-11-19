import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LandingComponent } from './component/landing/landing.component';
import { SigninComponent } from './component/signin/signin.component';
import { DashboardComponent } from 'src/admin/component/dashboard/dashboard.component';
import { AdminEventsComponent } from 'src/admin/component/admin-events/admin-events.component';
import { AddEventComponent } from 'src/organizer/components/add-event/add-event.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { OrganizerDashboardComponent } from 'src/organizer/components/organizer-dashboard/organizer-dashboard.component';
import { UserDashboardComponent } from 'src/users/components/user-dashboard/user-dashboard.component';
import { OrganizerEventsComponent } from 'src/organizer/components/organizer-events/organizer-events.component';
import { OrganizerSidebarComponent } from 'src/organizer/components/organizer-sidebar/organizer-sidebar.component';
import { authGuardGuard } from 'src/shared/guards/auth-guard.guard';
import { UserSingleEventRenderPageComponent } from 'src/users/components/user-single-event-render-page/user-single-event-render-page.component';
import { UserMyEventsComponent } from 'src/users/components/user-my-events/user-my-events.component';
import { UserRenderComponent } from 'src/users/components/user-render/user-render.component';
import { OrganizerMessagesComponent } from 'src/organizer/components/organizer-messages/organizer-messages.component';
import { OrganizerProfileComponent } from 'src/organizer/components/organizer-profile/organizer-profile.component';
import { FeedbackEventNameComponent } from 'src/organizer/components/feedbacks/feedback-event-name/feedback-event-name.component';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { OrganizerSingleEventRenderPageComponent } from 'src/organizer/components/organizer-single-event-render-page/organizer-single-event-render-page.component';
import { UsersEventsViewMorePageComponent } from 'src/users/components/users-events-view-more-page/users-events-view-more-page.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/welcome' ,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'welcome',
    component : LandingComponent
  },
  {
    path : 'signin',
    component : SigninComponent
  },
  {
    path : 'admin',
    component : DashboardComponent
  },
  {
    path : 'admin/events',
    component : AdminEventsComponent
  },

  {
    path : 'organizer',
    component : OrganizerSidebarComponent,
    canActivate : [authGuardGuard],
    children : [
      {
        path : 'dashboard',
        component : OrganizerDashboardComponent,
      },
      {
        path : 'events',
        component : OrganizerEventsComponent,
        // children : [
        //   {
        //     path : ":eventId",
        //     component : OrganizerSingleEventRenderPageComponent 
        //   }          
        // ]
      },
      {
        path : 'add-event',
        component : AddEventComponent
      },
      {
        path : 'messages',
        component : OrganizerMessagesComponent,
  
      },
      {
        path : 'profile',
        component : OrganizerProfileComponent
      }
    ]
  },
  // {
  //   path : "organizer/messages/event-name/:category",
  //   component : FeedbackEventNameComponent
  // },
  { 
    path : 'user/dashboard/eventdetails/:eventId',
    component : UserSingleEventRenderPageComponent
  },  
  { 
    path : "organizer/events/eventdetails/:eventId",
    component : OrganizerSingleEventRenderPageComponent 
  },
  {
    path : "user/dashboard/category/:category",
    component : UsersEventsViewMorePageComponent
  },
  {
    path : 'user',
    component : UserRenderComponent ,
    children : [
      {
        path : 'dashboard',
        component : UserDashboardComponent,
      },
      {
        path : 'myevents',
        component : UserMyEventsComponent
      }
      // {
      //   path : 'userDetails',
      //   component : UserSingleEventRenderPageComponent
      // }
    ]
  },
  {
    path : "**" , 
    component : PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
