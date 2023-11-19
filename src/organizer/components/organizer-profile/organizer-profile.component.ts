import { Component , OnInit} from '@angular/core';
import { IUser } from 'src/shared/models/UserDetails';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {
  userDetails! : IUser ;
  constructor(private _userLoginService : UserLoginDetailsService){}
  ngOnInit(): void {
    this.userDetails = this._userLoginService.userDetails;
  }
}
