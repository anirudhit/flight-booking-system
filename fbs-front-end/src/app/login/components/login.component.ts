import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { LoginService } from './../services/login.service';
import { LoginUser } from './../models/loginUser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService,// {4}
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.userLoginForm.get(field).valid && this.userLoginForm.get(field).touched) ||
      (this.userLoginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  login() {
    if (this.userLoginForm.valid) {
      let loginUser = new LoginUser();
      loginUser.username = this.userLoginForm.value.userName;
      loginUser.password = this.userLoginForm.value.password;
      return this.loginService.getLoggedInUser(loginUser)
      .subscribe(loggedInUser => {
        if(loggedInUser){
          this.authService.login(this.userLoginForm.value);    // {7}
          this.formSubmitAttempt = true;             // {8}
        }else{
          console.log("In else");
        }
      });
    }
  }
}