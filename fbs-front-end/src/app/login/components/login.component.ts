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
  userLoginForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }

  isFieldInvalid(field: string) {
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
          this.authService.login(loggedInUser);
          this.formSubmitAttempt = true;
        }else{
          console.log("In else");
        }
      });
    }
  }
}