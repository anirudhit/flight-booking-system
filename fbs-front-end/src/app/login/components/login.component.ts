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
  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService,// {4}
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      let loginUser = new LoginUser();
      loginUser.name = this.form.value.userName;
      loginUser.password = this.form.value.password;
      return this.loginService.getLoggedInUser(loginUser)
               .subscribe(
                 loggedInUser => {
                  if(loggedInUser){
                    this.authService.login(this.form.value);    // {7}
                    this.formSubmitAttempt = true;             // {8}
                  }else{
                    console.log("In else");
                  }
                 }
                );
    }
  }
}