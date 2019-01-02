import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { BookReview } from '../model/bookReview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  p: number = 1;
  myReviews: Array<BookReview> = [];
  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getAllReview().subscribe(data => {
      this.myReviews = data;
      this.myReviews = this.myReviews.reverse();
    })
  }

}
