import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { UsersModule } from 'src/users/users.module';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MaterialModule } from 'src/material/material.module';
import { AdminDisplayComponent } from './component/admin-display/admin-display.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminEventsComponent } from './component/admin-events/admin-events.component';



@NgModule({
  declarations: [
    SidebarComponent,
    AdminDisplayComponent,
    DashboardComponent,
    AdminEventsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports : [
    SidebarComponent,
    AdminDisplayComponent,
    DashboardComponent,
    AdminEventsComponent
  ]
})
export class AdminModule { }
