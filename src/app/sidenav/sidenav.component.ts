import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminSevice } from '../services/admin.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent{
  sideBarWidth:number = 250;
  mainMargin:number = 250;
  sideBar:boolean = true;

  constructor(private adminService : AdminSevice ,private authService: AuthService,
              private router : Router) { }

  /**
   * @function toggleSideBar
   * @description Show or Hide sidebar
   */
  toggleSideBar(){
    if(this.sideBar){
      this.sideBarWidth = 0;
      this.mainMargin = 0;
      this.sideBar = false;
    }else{
      this.sideBarWidth = 250;
      this.mainMargin = 250;
      this.sideBar = true;
    }
    
  }

  /**
   * @function logout
   * @description Logout a user by clearing the local storage of browser.
   */
  logout(){
    this.adminService.isLoggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/logout']);
  }

}
