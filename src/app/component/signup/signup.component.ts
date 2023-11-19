import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UserLoginDetailsService } from 'src/shared/services/authentication/user-login-details.service';
import { IUser } from 'src/shared/models/UserDetails';
import { Router } from '@angular/router';


function emailMatcher (c : AbstractControl) : {[key : string] : boolean} | null { 
  const emailControl = c.get('email') ;
  const confirmControl = c.get('confirmEmail') ;
  if (emailControl?.pristine || confirmControl?.pristine) {
    return null ;
  }
  if (emailControl?.value != confirmControl?.value ){
      return {'match' : true} ;
  }
  return null ;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{
  hide = true;
  signUpForm!:FormGroup ;
  public stringsToDisplay : any = {
    firstNameMessages : "" ,
    lastNameMessages : "",
    emailMessages : "" ,
    passwordMessages : "",
    roleMessages : "",
    confirmEmailMessages : "",
    combineEmailGroupMessages : "",
  }

  private validationMessages : any  = { 
    email : {
      required : 'Please enter your email address.' ,
      email : 'please enter a valid email address.',
    },
    firstName : {
      required : "please enter your first name",
      minlength : "The firstname length must be greater then 3 characters",
    },
    lastName : {
      required : "please enter your last name",
      maxlength : "The last name length cannot exceed more than 12 characters"
    },
    password : {
        required : "please enter your password", 
        minlength : "password must be atleast 6 characters",
    },
    typeOfUser : { 
      required : "role is required",
    },
    confirmEmail : {
      required : "please enter your email address", 
      email : "please enter a valid email address",
    },
    combineEmailGroup : { 
      match : "Email doesn't Match",
    }
  }


  constructor(
    private _fb : FormBuilder,
    private _userLoginService : UserLoginDetailsService,
    private _router : Router){}
  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      firstName : ["" , [Validators.required, Validators.minLength(3)]],
      lastName : ["", [Validators.required, Validators.maxLength(12)]],
      emailGroup : this._fb.group({
        email : ['' , [Validators.required , Validators.email]] ,
        confirmEmail :[ '' , [Validators.required , Validators.email]],
      } , {validator : emailMatcher} as any),
      password: ["", [Validators.required, Validators.minLength(6)]],
      typeOfUser : ["",[Validators.required]],
    });
    const firstNameControl = this.signUpForm?.get('firstName');
    firstNameControl?.valueChanges.subscribe(value => this.setMessage(firstNameControl , "firstName" , "firstNameMessages"))

    const lastNameControl = this.signUpForm?.get("lastName");
    lastNameControl?.valueChanges.subscribe(value =>this.setMessage(lastNameControl , "lastName", "lastNameMessages"));

    const combineEmailGroup = this.signUpForm.get('emailGroup') ;
    combineEmailGroup?.valueChanges.pipe(
    ).subscribe(value => this.setMessage(combineEmailGroup , "combineEmailGroup" , "combineEmailGroupMessages"));

    const emailControl = this.signUpForm.get('emailGroup.email') ;
    emailControl?.valueChanges.pipe(
      debounceTime(1000) 
    ).subscribe( value => this.setMessage(emailControl ,"email","emailMessages" ))

    const confirmEmailControl = this.signUpForm.get('emailGroup.confirmEmail') ;
    confirmEmailControl?.valueChanges.pipe(
      debounceTime(1000) 
    ).subscribe( value => this.setMessage(confirmEmailControl ,"confirmEmail","confirmEmailMessages"))

    const passwordControl = this.signUpForm.get('password');
    passwordControl?.valueChanges.pipe().subscribe(value => this.setMessage(passwordControl , "password" , "passwordMessages"))

    const roleControl = this.signUpForm.get('typeOfUser');
    roleControl?.valueChanges.pipe().subscribe(value => this.setMessage(roleControl, "typeOfUser" , "roleMessages"));

  }

  setMessage(c : AbstractControl, validationMessageType : string, messageToDisplay : string ) : void {
    this.stringsToDisplay[messageToDisplay] = '' ;
    if ( (c.touched || c.dirty) && c.errors) {
      this.stringsToDisplay[messageToDisplay] = Object.keys(c.errors).map(
        key => this.validationMessages[validationMessageType][key]).join(' ');
    }
  }

  addNewUserToService(newUser : IUser) : void {
    let temp = this._userLoginService.addNewUser(newUser).subscribe({
     next : item => {
      if(item.statusType == 'FAILED') {
        alert('User already exists please login');
      }
      else {
        alert('user added successfully');
      } 
      this._router.navigate(['/signin']);
     },
      error : err => {
        console.log(err)
      }
    });
  }

  save() : void {
    const newObj = <IUser> {} ;
    console.log(this.signUpForm.value);
    newObj.firstName =  this.signUpForm.value.firstName ;
    newObj.lastName = this.signUpForm.value.lastName ;
    newObj.email = this.signUpForm.value.emailGroup.email ;
    newObj.password = this.signUpForm.value.password ;
    newObj.typeOfUser = this.signUpForm.value.typeOfUser;
    this.addNewUserToService(newObj);
  } 

}
