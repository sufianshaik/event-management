import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { AdminModule } from 'src/admin/admin.module';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { UsersModule } from 'src/users/users.module';
import { EventCardComponent } from './components/event-card/event-card.component';



@NgModule({
  declarations: [
    EventCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminModule,
    OrganizerModule,
    UsersModule
  ],
})
export class SharedModule { }
