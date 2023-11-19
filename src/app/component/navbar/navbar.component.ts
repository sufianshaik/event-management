import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(public _userLoginService : UserLoginDetailsService, private _router : Router){}
  ngOnInit(): void {
    
  }

  logout() : void {
    window.localStorage.setItem("isLogin", JSON.stringify(false));
    window.localStorage.setItem("userId", JSON.stringify(""));
    window.localStorage.setItem("ROLE", JSON.stringify(""));
    window.localStorage.setItem("email" ,JSON.stringify(""));
    this._router.navigate(["/welcome"]);
    window.location.reload();
  }
}
