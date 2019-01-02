import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReview } from '../model/bookReview';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {
  /**
 * Server Base URL
 */
  reviewUrl = "http://localhost:5000/reviews";

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
   * @function addReview
   * @description Making a server call to add a new book review
   * @param review 
   */
  addReview(review: BookReview): Observable<any> {
    return this.http.post(this.reviewUrl, review, this.httpOptions);
  }

  /**
   * @function getReviewByOwnerId
   * @description Making a server call to get all reviews for loggedIn user
   * @param ownerId 
   */
  getReviewByOwnerId(ownerId: number): Observable<any> {
    return this.http.get(`${this.reviewUrl}?ownerId=${ownerId}`).pipe(response => response);
  }

  /**
   * @function getReviewById
   * @description Making a server call to get review by its id.
   * @param id 
   */
  getReviewById(id: number): Observable<any> {
    return this.http.get(`${this.reviewUrl}/${id}`).pipe(response => response);
  }

  /**
   * @function deleteReviewById
   * @description Making a server call to delete a review by reviewId.
   * @param id 
   */
  deleteReviewById(id: number): Observable<any> {

    return this.http.delete(`${this.reviewUrl}/${id}`).pipe(res => res);
  }

  /**
   * @function updateReviewById
   * @description Making a server call to update a review by its ID.
   * @param id 
   * @param review 
   */
  updateReviewById(id: number, review: BookReview): Observable<any> {
    return this.http.put(`${this.reviewUrl}/${id}`, review, this.httpOptions);
  }

  /**
   * @function getAllReview
   * @description Making a server call to all reviews from DB.
   */
  getAllReview(): Observable<any> {
    return this.http.get(this.reviewUrl).pipe(res => res);
  }

}
