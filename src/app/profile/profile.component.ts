import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminSevice } from '../services/admin.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly:boolean = true;
  profile: User;
  userId: number;
  myForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private activatedroute: ActivatedRoute, private myservice: AdminSevice) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.myservice.getAdminById(this.userId).subscribe(data => {
      this.profile = data;
    })

    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  /**
   * @function updateProfile
   * @description Making a service call to update user profile
   * @param myProfile 
   */
  updateProfile(myProfile: User) {
    myProfile.role = this.profile.role;
    myProfile.password = this.profile.password;
    this.myservice.updateUserById(this.userId, myProfile).subscribe(data => {
      this.myservice.getAdminById(this.userId).subscribe(data => {
        this.profile = data;
        this.readonly = true;
      })
    })
  }

  editable() {
    this.readonly = false;
  }
}


