import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  errorMessage: string;
  showErrorMessage: boolean = false;
  showHintMessage: boolean = false;
  private formSubmitAttempt: boolean; // {2}
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.userRegisterForm.get(field).valid && this.userRegisterForm.get(field).touched) ||
      (this.userRegisterForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  checkUsername() {
    this.showHintMessage = false;
    this.showErrorMessage = false;
    this.errorMessage = "";
    if (this.userRegisterForm.valid) {
      this.registerService.checkUserRegistrationDetails(this.userRegisterForm.value.userName)
      .subscribe(isUserRegistered =>{
          if(isUserRegistered){
            // Showing exception message if user is registered
            this.showErrorMessage = true;
            this.errorMessage = "The username is taken.Try another.";
          }else{
            // Register user takes place here
            this.registerService.getRegisterUserDetails(this.userRegisterForm.value.userName)
            .subscribe(data => {
              if(data){
                // Return valid github user details
                this.registerUser(data);
              }else{
                //Exception message for the invalid github user
                this.showErrorMessage = true;
                this.errorMessage = "The username is not available in github.Try another.";
              }
            },error =>{
              if(error){
                //Exception message for the invalid github user
                this.showErrorMessage = true;
                this.errorMessage = "The username is not available in github.Try another.";
              }
            });
          }
      });
    }
  }

  registerUser(userData : any){
    let userObj = {
      username: userData.login,
      imageUrl: userData.avatar_url,
      name: userData.name,
      email: userData.email,
      password: this.userRegisterForm.value.password
    };
    this.registerService.createUserRegistration(userObj)
    .subscribe(isUserRegistered =>{
        if(isUserRegistered){
          // Showing the hint message
          this.showHintMessage = true;
          this.userRegisterForm.get('userName').patchValue('');
          this.userRegisterForm.get('password').patchValue('');
          this.userRegisterForm.reset();
        }
    });
  }
}
