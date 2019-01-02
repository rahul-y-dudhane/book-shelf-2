import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * @function isLoggedIn
   * @description Checked a user is loggedIn or not
   */
  isLoggedIn(): boolean {
    return (localStorage.getItem('isLoggedIn') == 'true');
  }

  /**
   * @function isAdmin
   * @description Checked loggedIn user is admin or not.
   */
  isAdmin(): boolean {
    return (localStorage.getItem('role') == 'admin');
  }

}
