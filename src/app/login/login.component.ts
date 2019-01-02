import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms'
import { AdminSevice } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = 'rahul.y.dudhane@gmail.com';
  password = 'rahuld123';
  isError = false;

  constructor(private adminService: AdminSevice, private router: Router) { }

  ngOnInit() {

  }
  
  /**
   * @function login
   * @description Login a user
   * @param form 
   */
  login(form: NgForm) {

    this.adminService.authenticate(form.value.email, form.value.password).subscribe(data => {

      if (data == 0) {
        this.adminService.isLoggedIn.next(false);
        this.isError = true;

      } else {
        this.adminService.isLoggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', data[0].id);
        localStorage.setItem('role', data[0].role);
        localStorage.setItem('userName', data[0].firstName + ' ' + data[0].lastName);
        this.router.navigate(['/home']);
      }
    })
  }
}
