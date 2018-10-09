import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  private formSubmitAttempt: boolean; // {2}
  constructor(
    private fb: FormBuilder
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

  onSubmit() {
    alert("Register");
  }
}
