import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable()
export class AdminSevice {
    /**
     * Server Base URL
     */
    adminUrl = "http://localhost:5000/admins";

    /**
     * Creating Behaviour Subject for updating side bar menu items.
     */
    isLoggedIn = new BehaviorSubject(false);

    /**
     * Creating HTTP HEADER Option
     */
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    /**
     * @function getAllAdmins
     * @description Making server call to get all users
     */
    getAllAdmins(): Observable<any> {
        return this.http.get(this.adminUrl).pipe(res => res);
    }
    
    /**
     * @function authenticate
     * @description Making a server call to Validating user exists in Database or not
     * @param email 
     * @param password 
     */
    authenticate(email: string, password: string): Observable<any> {
        return this.http.get(`${this.adminUrl}?email=${email}&password=${password}`)
            .pipe(response => response);
    }

    /**
     * @function addUser
     * @description Making a server call to add a new user
     * @param user 
     */
    addUser(user: User): Observable<any> {
        return this.http.post(this.adminUrl, user, this.httpOptions);
    }

    /**
     * @function updateUserById
     * @description Making a server call to update a existing user
     * @param id 
     * @param updatedUser 
     */
    updateUserById(id: number, updatedUser: User): Observable<any> {
        return this.http.put(`${this.adminUrl}/${id}`, updatedUser, this.httpOptions);
    }

    /**
     * @function deleteUserById
     * @description Making a server call to delete existing user
     * @param id 
     */
    deleteUserById(id: number): Observable<any> {
        return this.http.delete(`${this.adminUrl}/${id}`);
    }

    /**
     * @function getAdminById
     * @description Making a server call to get a user by its id.
     * @param id 
     */
    getAdminById(id: number): Observable<any> {
        return this.http.get(`${this.adminUrl}/${id}`).pipe(response => response);
    }
}