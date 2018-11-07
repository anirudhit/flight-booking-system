import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './services/profile.service';

import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();

  profileForm: FormGroup;
  userName: any;
  userId: any;
  imageUrl: any;
  userRole: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createProfileForm();
    this.initUserDetails();
  }

  initUserDetails(){
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
    // this.userName = localStorage.getItem('token');
    // this.userId = localStorage.getItem('id');
    // this.imageUrl = localStorage.getItem('image_url');
    // this.userRole = "User";
    // this.loadUserProfile();
  }

  createProfileForm(){
    this.profileForm = this.fb.group({
      name: [''],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      middle_name: [''],
      ssn: [''],
      email: ['',Validators.email],
      address: [''],
      cell_number: ['',Validators.required]
    });
  }

  loadUserProfile(){
    this.profileService.getUserProfile(this.userId)
    .subscribe(user => {
        let userDetails: any = user;
        this.profileForm.patchValue({
          name: userDetails.name ? userDetails.name : '',
          first_name: userDetails.first_name ? userDetails.first_name : '',
          last_name: userDetails.last_name ? userDetails.last_name : '',
          middle_name: userDetails.middle_name ? userDetails.middle_name : '',
          ssn: userDetails.ssn ? userDetails.ssn : '',
          email: userDetails.email ? userDetails.email : '',
          address: userDetails.address ? userDetails.address : '',
          cell_number: userDetails.cell_number ? userDetails.cell_number : ''
        });
    });
  }

  saveProfile(){
    if(this.profileForm.valid){
      let userId = this.userId;
      if(this.profileForm.dirty){
        this.profileService.updateUserProfile(this.profileForm.value, userId)
          .subscribe(user => {
              if(user){
                console.log(user);
                let userDetails: any = user;
                if(userDetails.errorMessage){
                  this.profileToast(userDetails.errorMessage,"Ok");
                }else{
                  this.profileToast("Profile is updated","Ok");
                  this.profileForm.reset(this.profileForm.value);
                }
              }else{
                this.profileToast("Sorry. Some error occured","Ok");
              }
        });
      }else{
        this.profileToast("No changes are made to the profile","Ok");
      }
    }
  }

  profileToast(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  resetProfile(){
    this.loadUserProfile();
  }

}
