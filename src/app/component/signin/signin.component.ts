import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import {LocalStorage} from 'angular-web-storage';
import { ToastrService, provideToastr } from 'ngx-toastr';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide : boolean = true;
  signinForm! : FormGroup ;
  ROLE : string = "";

  public stringsToDisplay : any = {
    emailMessages : "" ,
    passwordMessages : "",
  }

  private validationMessages : any  = { 
    email : {
      required : 'Please enter your email address.' ,
      email : 'please enter a valid email address.',
    },
    password : {
        required : "please enter your password", 
        minlength : "password must be atleast 6 characters",
    },
  }

  constructor(private _fb : FormBuilder,
    private _userLoginService : UserLoginDetailsService,
    private _router : Router,
    private _toastr : ToastrService){}

  ngOnInit(): void {
    this.signinForm = this._fb.group({
      email : ["" , [Validators.email, Validators.required]],
      password : ["" , [Validators.required]],
    }); 

    const emailControl = this.signinForm.get('email') ;
    emailControl?.valueChanges.pipe(
      debounceTime(1000) 
    ).subscribe( value => this.setMessage(emailControl ,"email","emailMessages" )) ;


    const passwordControl = this.signinForm.get('password');
    passwordControl?.valueChanges.pipe().subscribe(value => this.setMessage(passwordControl , "password" , "passwordMessages"));
    
  }

  setMessage(c : AbstractControl, validationMessageType : string, messageToDisplay : string ) : void {
    this.stringsToDisplay[messageToDisplay] = '' ;
    if ( (c.touched || c.dirty) && c.errors) {
      this.stringsToDisplay[messageToDisplay] = Object.keys(c.errors).map(
        key => this.validationMessages[validationMessageType][key]).join(' ');
    }
  }


  getDetailsByLogin(email : string){
    this._userLoginService.getUserDetailsByEmail(email).subscribe({
      next : item => {
        this._userLoginService.userDetails = item;
        this.ROLE = item.typeOfRole;
      },
      error : err =>{
        console.log("Error message from getDetailsByLogin Component" + err);
      }
    })
  }


  checkUserLoginDetails(user : any) : void {
     let temp = this._userLoginService.loginUserCheck(user).subscribe({
      next : item => {
        if (item.statusType == "SUCCESS"){
          this._toastr.success("" , "LOGIN SUCCESSFULL : )")
          this._userLoginService.userDetails = item.user;
          window.localStorage.setItem("isLogin", JSON.stringify(true));
          window.localStorage.setItem("userId", JSON.stringify(item.message));
          window.localStorage.setItem("ROLE", JSON.stringify(item.user.typeOfUser));
          window.localStorage.setItem("email" , JSON.stringify(item.user.email));
          this._userLoginService.isLogin = true ;
          this._userLoginService.userId = JSON.parse(window.localStorage.getItem('userId') || item.message);
          this._userLoginService.isLogin = JSON.parse(window.localStorage.getItem('isLogin') || 'true');
          this._userLoginService.email = JSON.parse(window.localStorage.getItem("email") || item.user.email);

          if (this._userLoginService.userDetails.typeOfUser == 'user') {
            this._router.navigate(['/user/dashboard']);
          } 
          else {
            this._router.navigate(['/organizer/dashboard']);
          }
        }
        else if (item.statusType == "ERROR") {
          this._toastr.warning("please enter the correct password" , "Password Incorrect !")
        }
        else {
          this._toastr.error("please enter valid email address" ,"USER NOT FOUND : (");
        }
      }
     })
  }
  
  save(): void {
    this.checkUserLoginDetails(this.signinForm.value);
  }

}
